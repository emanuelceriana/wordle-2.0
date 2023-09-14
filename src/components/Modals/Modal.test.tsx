import { render } from "@testing-library/react";
import { Modal } from "./Modal";

interface ModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  showCloseButton: boolean;
  title: string;
}

describe("<MainMenu />", () => {
  let modalProps: ModalProps = {
    isOpen: true,
    onCloseRequest: () => {},
    showCloseButton: true,
    title: "Modal",
  };

  it("should render without errors", () => {
    const { asFragment } = render(<Modal {...modalProps}>test</Modal>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be closed if mainMenu is false", () => {
    modalProps.isOpen = false;

    const { queryByText } = render(<Modal {...modalProps}>test</Modal>);

    const modalContent = queryByText("test");

    expect(modalContent).not.toBeInTheDocument();
  });
  it("should be open if helMenuOpen is true", () => {
    modalProps.isOpen = true;

    const { queryByText } = render(<Modal {...modalProps}>test</Modal>);

    const modalContent = queryByText("test");

    expect(modalContent).toBeInTheDocument();
  });
  it("should show close button when showCloseButton is true", () => {
    modalProps.showCloseButton = true;

    const { getByRole } = render(<Modal {...modalProps}>test</Modal>);

    const closeButton = getByRole("button");

    expect(closeButton).toBeDefined();
  });
  it("should not show close button when showCloseButton is false", () => {
    modalProps.showCloseButton = false;

    const { queryByRole } = render(<Modal {...modalProps}>test</Modal>);

    const closeButton = queryByRole("button");

    expect(closeButton).toBe(null);
  });
});
