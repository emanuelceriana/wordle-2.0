import { renderHook } from "@testing-library/react";
import { useCreateObjectList } from "./useCreateObjectList";

describe("useCreateObjectList", () => {
  it("should return an Array of random ids", async () => {
    const arrayLength = 5;

    const {
      result: {
        current: { objectList },
      },
    } = renderHook(() => useCreateObjectList({ length: arrayLength }));

    expect(typeof objectList[0]?.id).toBe("string");
    expect(objectList.length).toBe(arrayLength);
  });
});
