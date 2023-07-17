import { useMemo, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "../Notifications/Notification";

export const useNotification = () => {
  const [key, setKey] = useState<string | null>(null);
  const [message, setMessage] = useState<ReactNode>(null);

  const setNotification = (message: string) => {
    setKey(uuidv4());
    setMessage(message);
  };

  const NotificationInstance = useMemo(() => {
    return <Notification key={key} message={message} />;
  }, [key, message]);

  return {
    NotificationInstance,
    setNotification,
  };
};
