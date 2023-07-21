import { renderHook, act } from "@testing-library/react";
import { useNotification } from "./useNotification";

describe("useNotification", () => {
  it("setNotification updates the message", () => {
    const notificationMessage = "This is a notification";
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.setNotification(notificationMessage);
    });

    expect(result.current.NotificationInstance.props.message).toBe(
      notificationMessage
    );
  });
  it("setNotification updates the key", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.setNotification("");
    });

    expect(result.current.NotificationInstance.key).toBeDefined();
  });
});
