import { green, yellow } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ReactNode } from "react";

const primary = green;
const secondary = yellow;

const theme = createTheme({
  palette: {
    primary: {
      main: primary[500],
      light: primary[200],
      dark: primary[800],
      contrastText: "black",
    },
    secondary: {
      main: secondary[500],
      light: secondary[200],
      dark: secondary[800],
      contrastText: "black",
    },
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
);
