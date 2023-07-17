import { ReactNode } from "react";
import styles from "./Notification.module.scss";
import cn from "classnames";

interface NotificatioProps {
  message: ReactNode;
}

export const Notification = ({ message }: NotificatioProps) => {
  return (
    message && (
      <div className={styles.notification}>
        <div className={cn(styles.message, styles.animation)}>
          <p>{message}</p>
        </div>
      </div>
    )
  );
};
