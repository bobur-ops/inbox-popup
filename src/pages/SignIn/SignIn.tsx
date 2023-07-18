import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const injectToken = (token: string) => {
    const element = document.getElementById("inbox-popup-token-container");
    if (element) {
      element.innerText = token;
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      injectToken(tokenResponse.access_token);
      localStorage.setItem("google_token", tokenResponse.access_token);
    },
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  return (
    <Container maxW={"container.md"} py={14}>
      <Heading textAlign={"center"}>Sign in page</Heading>
      <Box display={"flex"} justifyContent={"center"} p={10}>
        <Button
          colorScheme="teal"
          onClick={() => login()}
          leftIcon={<BsGoogle />}
        >
          Sign in
        </Button>
      </Box>

      <div
        style={{ opacity: 0, height: 0, width: 0, overflow: "hidden" }}
        id="inbox-popup-token-container"
      ></div>
    </Container>
  );
};

export default SignIn;
