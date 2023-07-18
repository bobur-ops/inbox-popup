import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../config/routes";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("google_token");
    if (!token) {
      navigate(APP_ROUTES.SIGN_IN);
    }
  }, []);

  return (
    <Container maxW={"container.md"} py={14}>
      <Box>
        <Heading size={"2xl"} mb={4} textAlign={"center"}>
          Inbox Popup
        </Heading>

        <Text fontSize={18} lineHeight={"6"} mb={4}>
          Inbox Popup is a powerful Chrome extension designed to revolutionize
          your email experience. Tired of constantly checking your inbox for new
          messages? With Inbox Popup, you'll never miss an important email
          again!
        </Text>
        <Text fontSize={18} mb={4}>
          Our extension works seamlessly with popular email providers like
          Gmail, Outlook, and Yahoo, delivering real-time popup notifications
          directly to your screen whenever you receive a new email. Say goodbye
          to constantly refreshing your inbox or leaving your email tab open all
          day.
        </Text>
        <Link to={APP_ROUTES.GUIDE}>
          <Button>Get Started</Button>
        </Link>
        <Heading size={"lg"} my={4}>
          Key Features
        </Heading>
        <UnorderedList spacing={4}>
          <ListItem>
            <Text lineHeight={"5"}>
              Instant Popup Notifications: Inbox Popup instantly alerts you with
              a sleek and customizable popup notification whenever a new email
              arrives in your inbox. Stay up-to-date with important messages
              without interrupting your workflow.
            </Text>
            <Image
              src="/public/feat/1.jpg"
              alt="guide-img"
              placeholder="blur"
              loading="lazy"
              w={"full"}
              rounded={"xl"}
              mb={4}
            />
          </ListItem>
          <ListItem>
            <Text lineHeight={"5"}>
              An Inbox that you can get an access without opening a new tab
            </Text>
            <Image
              src="/public/feat/2.jpg"
              alt="guide-img"
              placeholder="blur"
              loading="lazy"
              w={"full"}
              rounded={"xl"}
              mb={4}
            />
          </ListItem>
          <ListItem>
            <Text lineHeight={"5"}>
              Privacy and Security: We value your privacy and have taken
              extensive measures to ensure the security of your data. Inbox
              Popup works directly within your browser, and no sensitive
              information is ever stored or shared with third parties.
            </Text>
          </ListItem>
        </UnorderedList>
        <Text lineHeight={"6"} my={4} fontSize={18}>
          Experience the convenience and efficiency of Inbox Popup as it
          transforms your email workflow. Never miss a crucial email again and
          stay on top of your communications effortlessly.
        </Text>
        <Text lineHeight={"6"} fontSize={18}>
          Download Inbox Popup today from the Chrome Web Store and take control
          of your inbox like never before. Enhance your productivity, streamline
          your email management, and enjoy the simplicity of instant
          notifications.
        </Text>
        <Link to={APP_ROUTES.GUIDE}>
          <Button mt={8}>How to install Inbox Popup</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Main;
