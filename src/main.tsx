import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./config/routes";
import { Main, SignIn, Guide } from "./pages";
import { ChakraBaseProvider } from "@chakra-ui/react";
import Fonts from "./components/fonts";
import theme from "./lib/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="45364919601-57a894l631usr7u167u55eqv0ipjuo1i.apps.googleusercontent.com">
      <ChakraBaseProvider theme={theme}>
        <Fonts />
        <BrowserRouter>
          <Routes>
            <Route path={APP_ROUTES.MAIN} element={<Main />} />
            <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={APP_ROUTES.GUIDE} element={<Guide />} />
          </Routes>
        </BrowserRouter>
      </ChakraBaseProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
