import { ReactNode } from "react";
import styles from "./Notification.module.scss";
import cn from "classnames";

interface NotificationProps {
  message: ReactNode;
}

export const Notification = ({ message }: NotificationProps) => {
  return (
    message && (
      <div className={styles.notification}>
        <div
          data-testid="notificationMessage"
          className={cn(styles.message, styles.animation)}
        >
          <p>{message}</p>
        </div>
      </div>
    )
  );
};
