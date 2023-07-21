import { render } from "@testing-library/react";
import { Notification } from "./Notification";

describe("<Notification />", () => {
  const testMessage = "test";

  it("should render without errors", () => {
    const { asFragment } = render(<Notification message={testMessage} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render the message correctly", () => {
    const { getByText } = render(<Notification message={testMessage} />, {});
    expect(getByText(testMessage)).toBeInTheDocument();
  });
});
