import { render, fireEvent } from "@testing-library/react";
import { WordLengthSelector } from "./WordLengthSelector";

describe("<WordLengthSelector />", () => {
  const defaultValue = 5;
  const setDefaultValue = jest.fn();
  it("should render without errors", () => {
    const { asFragment } = render(
      <WordLengthSelector
        defaultValue={defaultValue}
        onClickRequest={setDefaultValue}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render with default value selected", () => {
    const { container } = render(
      <WordLengthSelector
        defaultValue={defaultValue}
        onClickRequest={setDefaultValue}
      />
    );

    expect(
      container.querySelector(".wordLengthSelector__selected")?.innerHTML
    ).toBe(defaultValue.toString());
  });
  it("should change value correctly", () => {
    const newValue = 7;
    const { getByText } = render(
      <WordLengthSelector
        defaultValue={defaultValue}
        onClickRequest={setDefaultValue}
      />
    );

    fireEvent.click(getByText(newValue.toString()));

    expect(setDefaultValue).toHaveBeenCalledWith(newValue);
  });
});
