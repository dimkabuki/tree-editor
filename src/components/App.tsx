import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { getNodesFromFakeApi } from "../model/data";
import { Home } from "./Home";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: getNodesFromFakeApi,
  },
]);

export const App: FC = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </ThemeProvider>
);
