import { Box, Button, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useAuth } from "providers/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [invalid, setInvalid] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    if (auth?.signedIn) navigate("/");
  }, []);

  const handleCheck = async () => {
    const valid = await auth?.checkKey(key);
    if (valid) navigate("/");
    else setInvalid(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          To access this Alfred Assistant you need to introduce your API key.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: red[500], display: invalid ? "block" : "none" }}
        >
          Invalid API key. Make sure it is spelled correctly. The key is
          case-sensitive.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 1,
            width: "100%",
          }}
        >
          <TextField
            label="You API key"
            fullWidth
            onChange={(e) => setKey(e.target.value)}
          />
          <Button variant="contained" onClick={handleCheck}>
            Check
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
