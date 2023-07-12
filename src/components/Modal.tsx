import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onCloseRequest?: () => void;
  showCloseButton: boolean;
  title?: string;
  children: ReactNode | ReactNode[];
}

const Modal = ({
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
      <div className="modalBackground" />

      <div className="modal">
        <div className="title">{title}</div>
        {showCloseButton && (
          <button className="closeButton" onClick={onCloseRequest}>
            X
          </button>
        )}
        <div className="body">{children}</div>
      </div>
    </>
  );
};

export default Modal;
