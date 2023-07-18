import { useState } from "react";
import styles from "./EmailMessage.module.css";
import { BiLogoGmail } from "react-icons/bi";

interface EmailMessageProps {
  message: string;
  author: string;
  subject: string;
  snippet: string;
  date: string;
}

const EmailMessage: React.FC<EmailMessageProps> = ({
  author,
  message,
  subject,
  snippet,
  date,
}) => {
  const [expandMessage, setExpandMessage] = useState(false);

  return (
    <div
      onClick={() => setExpandMessage((prev) => !prev)}
      className={styles.content}
    >
      <div className={styles["content-logo"]}>
        <BiLogoGmail size={50} />
      </div>
      <div className={styles["content-info"]}>
        <div className={styles["content-info__author"]}>{author}</div>
        <div className={styles["content-info__subject"]}>{subject}</div>
        {expandMessage ? (
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            className={styles["content-info__message"]}
          ></div>
        ) : (
          <div className={styles["content-info__message"]}>{snippet}</div>
        )}
      </div>

      <div className={styles.time}>{date}</div>
    </div>
  );
};

export default EmailMessage;
