import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { RecoilRoot } from "recoil";
import { App } from "./components/App";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
