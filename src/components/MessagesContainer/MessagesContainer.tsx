import EmailMessage from "../EmailMessage/EmailMessage";
import styles from "./MessagesContainer.module.css";

interface Message {
  author: string;
  subject: string;
  messageBody: string;
  receivedDate: Date;
  snippet: string;
}

export function getTimeAgo(date: Date): string {
  const currentDate = new Date();
  const timestamp = date;
  const timeDifference = Math.floor(
    (currentDate.getTime() - timestamp.getTime()) / 1000
  ); // Time difference in seconds

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (timeDifference < secondsInMinute) {
    return "now";
  } else if (timeDifference < secondsInHour) {
    const minutesAgo = Math.floor(timeDifference / secondsInMinute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < secondsInDay) {
    const hoursAgo = Math.floor(timeDifference / secondsInHour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    const daysAgo = Math.floor(timeDifference / secondsInDay);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }
}

const MessagesContainer = ({ messages }: { messages: Message[] }) => {
  return (
    <div className={styles.container}>
      {messages.map((item) => (
        <EmailMessage
          author={item.author}
          subject={item.subject}
          message={item.messageBody}
          snippet={item.snippet}
          date={getTimeAgo(item.receivedDate)}
        />
      ))}
    </div>
  );
};

export default MessagesContainer;
