import { renderHook } from "@testing-library/react";
import useClickOutside from "./useClickOutside";

describe("useClickOutside", () => {
  it("should call focus when clicking outside the rowRefs element", async () => {
    const activeRowIdx = 0;

    const rowRefs = { current: [document.createElement("div")] };
    rowRefs.current[activeRowIdx].focus = jest.fn();

    renderHook(() => useClickOutside({ rowRefs, activeRowIdx }));

    const targetElement = document.createElement("div");
    document.body.appendChild(targetElement);

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: targetElement });

    document.dispatchEvent(event);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(rowRefs.current[activeRowIdx].focus).toHaveBeenCalledTimes(1);

    // Clean up the target element
    document.body.removeChild(targetElement);
  });
  it("should do nothing if the user click the rowRefs element", async () => {
    const activeRowIdx = 0;

    const rowRefs = { current: [document.createElement("div")] };
    rowRefs.current[activeRowIdx].focus = jest.fn();

    renderHook(() => useClickOutside({ rowRefs, activeRowIdx }));

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", {
      value: rowRefs.current[activeRowIdx],
    });

    document.dispatchEvent(event);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(rowRefs.current[activeRowIdx].focus).toHaveBeenCalledTimes(0);
  });
});
