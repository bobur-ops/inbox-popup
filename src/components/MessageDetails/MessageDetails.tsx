import axios from "axios";
import styles from "./MessageDetails.module.css";
import { useState, useEffect } from "react";
import { goBack } from "react-chrome-extension-router";
import { IEmail, ParseGmailApi } from "gmail-api-parse-message-ts";
import { MdOutlineArrowBack } from "react-icons/md";
import { deleteToken } from "../../background";
import { goTo } from "react-chrome-extension-router";
import Inbox from "../Inbox/Inbox";

const MessageDetailsSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles["skeleton-author"]}></div>
      <div className={styles["skeleton-message"]}></div>
    </div>
  );
};

const MessageDetails: React.FC<{ id: string; access_token: string }> = ({
  id,
  access_token,
}) => {
  const [message, setMessage] = useState<IEmail | null>(null);
  const [loading, setLoading] = useState(false);

  const getMessage = async () => {
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/gmail/v1/users/me/messages/${id}`;
      const parse = new ParseGmailApi();
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const parsedMessage: IEmail = parse.parseMessage(res.data);
      setMessage(parsedMessage);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        deleteToken();
        goTo(Inbox);
        const views = chrome.extension.getViews({ type: "popup" });
        if (views && views.length > 0) {
          const currentPopup = views[0];
          // Reload the current popup window
          currentPopup.location.reload();
        }
        setLoading(false);
      } else {
        console.log();
      }
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className={styles.container}>
      <div onClick={() => goBack()} className={styles["back-btn"]}>
        <MdOutlineArrowBack size={24} />
      </div>
      {loading ? (
        <MessageDetailsSkeleton />
      ) : (
        <>
          <div className={styles["message-author"]}>{message?.from.email}</div>
          <div
            dangerouslySetInnerHTML={{ __html: message?.textHtml as string }}
            className={styles["message-body"]}
          ></div>
        </>
      )}
    </div>
  );
};

export default MessageDetails;
