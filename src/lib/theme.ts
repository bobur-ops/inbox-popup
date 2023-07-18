import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: () => ({
    body: {
      bg: "#202023",
      color: "#fff",
    },
  }),
};

const config = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config, styles });
export default theme;
