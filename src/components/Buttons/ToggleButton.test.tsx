import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleButton } from "./ToggleButton";

describe("<ToggleButton />", () => {
  it("should render without errors", () => {
    const { asFragment } = render(
      <ToggleButton value={true} onToggle={() => {}} />,
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should call onToggle when user clicks", () => {
    const value = true;
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <ToggleButton value={value} onToggle={onToggle} />,
      {}
    );

    fireEvent.click(getByTestId("hardModeToggleButton"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
  it("should not call onToggle when user clicks if the component is disabled", async () => {
    const value = true;
    const onToggle = jest.fn();

    const { getByTestId } = render(
      <ToggleButton value={value} disabled={true} onToggle={onToggle} />,
      {}
    );

    await userEvent.click(getByTestId("hardModeToggleButton"));

    expect(onToggle).toHaveBeenCalledTimes(0);
  });
});
