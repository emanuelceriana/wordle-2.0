import { renderHook } from "@testing-library/react";
import { useGenerateRandomWord } from "./useGenerateRandomWord";
import { QueryClient } from "react-query";
import fetchMock from "jest-fetch-mock";

describe("useGenerateRandomWord", () => {
  const queryClient = new QueryClient({});
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should return a random word from api", async () => {
    const wordLength = 0;
    const randomWord = "test";

    fetchMock.mockResponseOnce(JSON.stringify([randomWord]), {
      status: 200,
    });

    const {
      result: {
        current: { generate },
      },
    } = renderHook(() => useGenerateRandomWord({ wordLength, queryClient }));

    const fetchRandomWord = await generate();

    expect(fetchRandomWord).toBe(randomWord);
  });
  it("should return a word with the length provided", async () => {
    const wordLength = 5;

    fetchMock.dontMockOnce();

    const {
      result: {
        current: { generate },
      },
    } = renderHook(() => useGenerateRandomWord({ wordLength, queryClient }));

    const randomWord = await generate();

    expect(typeof randomWord).toBe("string");
    expect(randomWord.split("").length).toBe(wordLength);
  });
  it("should return a word from WordDataSet with the length provided if the api fails", async () => {
    const wordLength = 4;

    fetchMock.mockResponseOnce(() =>
      Promise.resolve().then(() => ({ status: 500 }))
    );

    const {
      result: {
        current: { generate },
      },
    } = renderHook(() => useGenerateRandomWord({ wordLength, queryClient }));

    const randomWord = await generate();

    expect(typeof randomWord).toBe("string");
    expect(randomWord.split("").length).toBe(wordLength);
  });
});
