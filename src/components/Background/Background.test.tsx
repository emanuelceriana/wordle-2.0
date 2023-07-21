import { render } from "@testing-library/react";
import { Background } from "./Background";

describe("<Background />", () => {
  it("should render without errors", () => {
    const { asFragment } = render(<Background />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
