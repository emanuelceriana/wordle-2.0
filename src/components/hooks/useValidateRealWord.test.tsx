import { renderHook } from "@testing-library/react";
import { useValidateRealWord } from "./useValidateRealWord";
import fetchMock from "jest-fetch-mock";
import { QueryClient } from "react-query";

describe("useValidateRealWord", () => {
  const queryClient = new QueryClient({});
  fetchMock.enableMocks();
  fetchMock.dontMock();

  const {
    result: {
      current: { validate },
    },
  } = renderHook(() => useValidateRealWord({ queryClient }));

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should return true if the word is a valid word", async () => {
    const wordToValidate = "animal";

    const isValid = await validate(wordToValidate);

    expect(isValid).toBe(true);
  });
  it("should return false if the word is not a valid word", async () => {
    const wordToValidate = "asdasdas";

    const isValid = await validate(wordToValidate);

    expect(isValid).toBe(false);
  });
  it("should return false if the api fails ", async () => {
    const wordToValidate = "asdasdas";

    fetchMock.doMockOnce(() => Promise.resolve().then(() => ({ status: 500 })));
    const isValid = await validate(wordToValidate);

    expect(isValid).toBe(false);
  });
});
