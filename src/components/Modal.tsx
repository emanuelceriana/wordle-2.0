import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onCloseRequest?: () => void;
  showCloseButton: boolean;
  children: ReactNode | ReactNode[];
}

const Modal = ({
  isOpen,
  onCloseRequest,
  showCloseButton,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modalBackground" />
      <div className="modal">
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
