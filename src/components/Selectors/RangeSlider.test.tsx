import { render, fireEvent } from "@testing-library/react";
import { RangeSlider } from "./RangeSlider";
import userEvent from "@testing-library/user-event";

describe("<RangeSlider />", () => {
  const defaultValue = 6;
  const setDefaultValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { asFragment } = render(
      <RangeSlider
        defaultValue={defaultValue}
        onChangeRequest={setDefaultValue}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render with default value", () => {
    const { getByRole } = render(
      <RangeSlider
        defaultValue={defaultValue}
        onChangeRequest={setDefaultValue}
      />
    );

    const input = getByRole("slider") as HTMLInputElement;

    expect(parseInt(input.value)).toBe(defaultValue);
  });
  it("should change value correctly", () => {
    const newValue = "20";
    const { getByRole } = render(
      <RangeSlider
        defaultValue={defaultValue}
        onChangeRequest={setDefaultValue}
      />
    );

    fireEvent.change(getByRole("slider"), { target: { value: newValue } });

    expect(setDefaultValue).toHaveBeenCalledWith(parseInt(newValue));
  });
  it("should change only between 1 and 50", () => {
    const setDefaultValue = jest.fn();
    const { getByRole } = render(
      <RangeSlider
        defaultValue={defaultValue}
        onChangeRequest={setDefaultValue}
      />
    );

    const input = getByRole("slider");
    input.setAttribute("min", "0");
    input.setAttribute("max", "1000");

    fireEvent.change(input, { target: { value: 100 } });
    expect(setDefaultValue).toHaveBeenCalledTimes(0);
    fireEvent.change(input, { target: { value: 0 } });
    expect(setDefaultValue).toHaveBeenCalledTimes(0);
  });
});
