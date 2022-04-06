import axios from "axios";
import { AuthContextType } from "interfaces";
import { useState, useContext, createContext, useEffect } from "react";
import { Navigate } from "react-router";

// Interfaces
interface PropTypes {
  children?: React.ReactNode;
}

// Components
const AuthContext = createContext<AuthContextType | null>(null);

const useProvideAuth = () => {
  const [signedIn, setSignedIn] = useState<boolean>(true);

  useEffect(() => {
    const saved_key = localStorage.getItem("api_key") || "";
    checkKey(saved_key);
  }, []);

  const checkKey = async (api_key: string) => {
    try {
      const res = await axios.get("/test", {
        headers: { "X-API-KEY": api_key },
      });
      signIn(api_key);
      return true;
    } catch (e) {
      return false;
    }
  };

  const signIn = (api_key: string) => {
    localStorage.setItem("api_key", api_key);
    axios.defaults.headers.common["X-API-KEY"] = api_key;
    setSignedIn(true);
  };

  const signOut = () => {
    axios.defaults.headers.common["X-API-KEY"] = "";
    setSignedIn(false);
  };

  return {
    signedIn,
    checkKey,
    signOut,
  };
};

// Exports
export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }: PropTypes) => {
  const auth = useAuth();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(auth !== null && auth.signedIn !== false);
  }, [auth]);

  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
