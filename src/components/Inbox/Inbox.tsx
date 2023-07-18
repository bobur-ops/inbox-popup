import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Inbox.module.css";
import { IEmail, ParseGmailApi } from "gmail-api-parse-message-ts";
import { getTimeAgo } from "../MessagesContainer/MessagesContainer";
import { goTo } from "react-chrome-extension-router";
import MessageDetails from "../MessageDetails/MessageDetails";
import { deleteToken } from "../../background";

interface MessageInterface {
  author: string;
  snippet: string;
  subject: string;
  date: string;
  id: string;
}

interface MessageComponentProps extends MessageInterface {
  access_token: string;
}

interface InboxProps {
  access_token: string;
}

const MessageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles["skeleton-author"]}></div>
      <div className={styles["skeleton-subject"]}></div>
      <div className={styles["skeleton-snippet"]}></div>
      <div className={styles["skeleton-date"]}></div>
    </div>
  );
};

const MessageComponent: React.FC<MessageComponentProps> = ({
  author,
  date,
  snippet,
  subject,
  id,
  access_token,
}) => {
  return (
    <div
      onClick={() => goTo(MessageDetails, { id, access_token })}
      className={styles.message}
    >
      <div className={styles["message-author"]}>{author}</div>
      <div className={styles["message-subject"]}>{subject}</div>
      <div className={styles["message-snippet"]}>{snippet}</div>
      <div className={styles["message-date"]}>{date}</div>
    </div>
  );
};

const Inbox: React.FC<InboxProps> = ({ access_token }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [itemsToGet, setItemsToGet] = useState(8);

  const getAllMessages = async (emailsNumber: number) => {
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=${emailsNumber}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const newMessages: MessageInterface[] = [];
      for (const msg of response.data.messages) {
        const parse = new ParseGmailApi();
        const res = await axios.get(
          `https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const parsedMessage: IEmail = parse.parseMessage(res.data);
        if (!parsedMessage.labelIds.includes("CATEGORY_PROMOTIONS")) {
          const data: MessageInterface = {
            author: parsedMessage.from.name.length
              ? parsedMessage.from.name
              : parsedMessage.from.email,
            date: getTimeAgo(new Date(parsedMessage.internalDate)),
            snippet: parsedMessage.snippet,
            subject: parsedMessage.subject,
            id: parsedMessage.id,
          };
          newMessages.push(data);
          setMessages(newMessages);
        }
      }
      // setMessages(newMessages);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        deleteToken();
        setLoading(false);
        const views = chrome.extension.getViews({ type: "popup" });
        if (views && views.length > 0) {
          const currentPopup = views[0];
          // Reload the current popup window
          currentPopup.location.reload();
        }
      } else {
        console.log();
      }
    }
  };

  useEffect(() => {
    getAllMessages(itemsToGet);
  }, []);

  const handleLoadMore = () => {
    setItemsToGet((prev) => prev + 10);
    getAllMessages(itemsToGet);
  };

  return (
    <div className={styles.container}>
      {messages.map((msg) => (
        <MessageComponent
          author={msg.author}
          date={msg.date}
          snippet={msg.snippet}
          subject={msg.subject}
          id={msg.id}
          access_token={access_token}
          key={msg.id}
        />
      ))}
      {loading && [1, 2, 3, 4].map((item) => <MessageSkeleton key={item} />)}
    </div>
  );
};

export default Inbox;
