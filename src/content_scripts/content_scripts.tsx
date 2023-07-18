import { deleteToken, getToken, setToken } from "../background";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import MessagesContainer from "../components/MessagesContainer/MessagesContainer";
import { ParseGmailApi, IEmail } from "gmail-api-parse-message-ts";

const injectToken = async () => {
  const index = document.createElement("div");
  index.id = "content-script";

  document.body.appendChild(index);
  const intervalId = setInterval(() => {
    const element = document.getElementById("inbox-popup-token-container");
    if (!element) {
      clearInterval(intervalId);
      return;
    }
    if (element.innerText !== "") {
      setToken(element.innerText);
      clearInterval(intervalId);
    }
  }, 500);
};

const pollForNewMessages = async () => {
  const access_token: any = await getToken();
  if (!access_token) return;
  let messages: string[] = [];

  const fetchNewMessages = async (accessToken: string) => {
    try {
      const messagesEndpoint = `https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread`;
      const gmailMessages = await axios.get(messagesEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return gmailMessages.data.messages as { id: string; threadId: string }[];
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        deleteToken();

        chrome.runtime.sendMessage({ action: "openPopup" });
      } else {
        console.log();
      }
    }
  };

  const newMessages = await fetchNewMessages(access_token);
  if (newMessages) {
    messages = newMessages.map((item) => item.id);
  }

  const pollMsg = async () => {
    const unreadMessages = await fetchNewMessages(access_token);
    if (!unreadMessages) return;
    const newMessages = unreadMessages.filter(
      (msg) => !messages.includes(msg.id)
    );

    if (newMessages.length > 0) {
      enablePopupMessage(newMessages);
      messages = [...newMessages.map((msg) => msg.id), ...messages];
    }
  };
  setInterval(pollMsg, 1000);
};

pollForNewMessages();

injectToken();

const enablePopupMessage = async (newMessages: any[]) => {
  const access_token: any = await getToken();
  if (!access_token) return;
  let messages: {
    author: string;
    subject: string;
    messageBody: string;
    receivedDate: Date;
    snippet: string;
  }[] = [];

  for (const index in newMessages) {
    const parse = new ParseGmailApi();
    const msg = newMessages[index];
    const response = await axios.get(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const parsedEmail: IEmail = parse.parseMessage(response.data);

    const data = {
      author: parsedEmail.from.name.length
        ? parsedEmail.from.name
        : parsedEmail.from.email,
      subject: parsedEmail.subject,
      messageBody: parsedEmail.textHtml,
      receivedDate: new Date(parsedEmail.internalDate),
      snippet: parsedEmail.snippet,
    };

    messages.push(data);
  }

  // if (!messages.length) return;

  const index = document.createElement("div");
  index.id = "content-script";

  document.body.appendChild(index);

  ReactDOM.createRoot(index).render(
    <React.StrictMode>
      <MessagesContainer messages={messages} />
    </React.StrictMode>
  );

  let removeTimeout = setTimeout(() => {
    document.body.removeChild(index);
  }, 15000);

  index.onmouseenter = () => {
    clearTimeout(removeTimeout);
  };

  index.onmouseleave = () => {
    removeTimeout = setTimeout(() => {
      document.body.removeChild(index);
    }, 15000);
  };
};
