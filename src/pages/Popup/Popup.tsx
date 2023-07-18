import { useEffect, useState } from "react";
import { deleteToken, getToken, setToken } from "../../background";
import styles from "./Popup.module.css";
import Inbox from "../../components/Inbox/Inbox";
import { Link } from "react-chrome-extension-router";
import MessageDetails from "../../components/MessageDetails/MessageDetails";

function Popup() {
  const [access_token, setAccess_token] = useState("");

  useEffect(() => {
    getMyToken();
  }, []);

  const getMyToken = async () => {
    const token: any = await getToken();
    if (!token) return;
    setAccess_token(token);
  };

  if (!access_token) {
    return (
      <div className={styles["no-token"]}>
        <div className={styles["content-title"]}>
          It seems like you are not signed in
        </div>
        <div className={styles["sign-container"]}>
          <button
            onClick={() => {
              chrome.tabs.create({
                url: "https://inbox-popup.vercel.app/signin",
              });
            }}
            className={styles["sign-btn"]}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Inbox access_token={access_token} />
    </div>
  );
}

export default Popup;
