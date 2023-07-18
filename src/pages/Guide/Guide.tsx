import {
  Box,
  Button,
  Code,
  Container,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";

const Guide: React.FC = () => {
  return (
    <Container maxW={"container.md"} py={14}>
      <Link href="/">
        <Button mb={8}>Go to the homepage</Button>
      </Link>
      <Heading mb={8}>How to install Inbox Popup</Heading>
      <OrderedList fontSize={20} spacing={8}>
        <ListItem>
          <Heading size={"md"} mb={2}>
            Download the zip file of extension
          </Heading>
          <Box mb={2}>
            <Link
              href="https://drive.google.com/file/d/1pBnLRPwyLwv-zmKOB_CGbNUUwGVo-udf/view?usp=drive_link"
              color={"linkedin.400"}
              target="_blank"
            >
              Link to download
            </Link>
          </Box>
          <Image
            src="/public/guide/1.jpg"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
          />
        </ListItem>
        <ListItem>
          <Heading size={"md"} mb={2}>
            Extract Files
          </Heading>
          <Image
            src="/public/guide/2.jpg"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />
          <Text mb={4}>
            You will see a folder <b>dist</b>
          </Text>
          <Image
            src="/public/guide/3.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />
        </ListItem>
        <ListItem>
          <Heading size={"md"} mb={2}>
            - Go to the chrome extensions page
          </Heading>
          <Text mb={6}>
            - <Code>chrome://extensions</Code> - paste it to the search bar
          </Text>

          <Text mb={2}> - Turn on the developer mode</Text>
          <Image
            src="/public/guide/4.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={8}
          />

          <Text mb={2}>
            - Click on the button <Code>Load unpacked</Code>
          </Text>
          <Image
            src="/public/guide/5.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />

          <Text mb={2}>
            - Find the <Code>dist</Code> folder, extracted from zip and click{" "}
            <Code>Select Folder</Code>
          </Text>
          <Image
            src="/public/guide/6.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />

          <Text mb={2}>
            - Here you are! The extension is loaded and you can use it
          </Text>
          <Image
            src="/public/guide/7.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />

          <Text mb={2}>- Pin the extension so it is easy to use</Text>
          <Image
            src="/public/guide/8.png"
            alt="guide-img"
            placeholder="blur"
            loading="lazy"
            w={"full"}
            rounded={"xl"}
            mb={4}
          />
        </ListItem>
      </OrderedList>
      <Link href="/">
        <Button mt={8}>Go to the homepage</Button>
      </Link>
    </Container>
  );
};

export default Guide;
