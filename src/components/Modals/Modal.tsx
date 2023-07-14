import { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onCloseRequest?: () => void;
  showCloseButton: boolean;
  title?: string;
  children: ReactNode | ReactNode[];
}

export const Modal = ({
  isOpen,
  onCloseRequest,
  showCloseButton,
  title,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.modalBg} />

      <div className={styles["modalBg__modal"]}>
        <div className={styles["modalBg__modal-title"]}>{title}</div>
        {showCloseButton && (
          <button
            className={styles["modalBg__modal-cButton"]}
            onClick={onCloseRequest}
          >
            X
          </button>
        )}
        <div className={styles["modalBg__modal-body"]}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
