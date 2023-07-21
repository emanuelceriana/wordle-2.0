import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

const localStorageMock = (function () {
  let store: { [key: string]: any } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

describe("useLocalStorage", () => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  it("should get, set and remove local storage", async () => {
    const {
      result: {
        current: { getLocalStorage, setLocalStorage, removeLocalStorage },
      },
    } = renderHook(() => useLocalStorage());

    const testObject = { value: "test" };

    setLocalStorage("test", testObject);

    expect(getLocalStorage("test")).toStrictEqual(
      JSON.parse(JSON.stringify(testObject))
    );

    removeLocalStorage("test");

    expect(getLocalStorage("test")).toBe(null);
  });
});
