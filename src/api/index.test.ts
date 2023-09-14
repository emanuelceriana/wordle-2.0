import { fetchHints, fetchRandomWord, validateWord } from "./index";

const setFetchMockData = (data: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

const setFetchMockError = (error: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject(error),
    })
  ) as jest.Mock;
};

describe("fetchHints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch hints for an specific word", async () => {
    const dataHints = {
      results: [
        {
          lexicalEntries: [
            {
              entries: [{ senses: [{ definitions: ["test"] }] }],
              lexicalCategory: { text: "noun" },
            },
          ],
        },
      ],
    };
    const formatedResponse = [
      { lexicalCategory: "noun", shortDefinitions: "test" },
    ];
    setFetchMockData(dataHints);
    const hintsResponse = await fetchHints("randomWord");

    expect(hintsResponse).toEqual(formatedResponse);
  });

  it("should return an empty array if the word don't exist", async () => {
    setFetchMockData(null);
    const hintsResponse = await fetchHints("randomWord");

    expect(hintsResponse).toEqual([]);
  });

  it("should return error if something went wrong", async () => {
    const error = "Something went wrong";
    setFetchMockError(error);
    const hintsResponse = await fetchHints("randomWord");

    expect(hintsResponse).toEqual(error);
  });
});

describe("fetchRandomWord", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a random word", async () => {
    const randomWord = ["test"];
    setFetchMockData(randomWord);
    const randomWordResponse = await fetchRandomWord(4);
    expect(randomWordResponse).toEqual(randomWord[0]);
  });

  it("should return error if something went wrong", async () => {
    const error = "Something went wrong";
    setFetchMockError(error);
    const randomWordResponse = await fetchRandomWord(4);
    expect(randomWordResponse).toEqual(error);
  });
});

describe("validateWord", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true given a specific word if the word exist", async () => {
    const existentWord = { word: "test" };
    setFetchMockData(existentWord);
    const isValidWord = await validateWord("");
    expect(isValidWord).toEqual(!!existentWord);
  });

  it("should return false given a specific word if the word doesn't exist", async () => {
    const existentWord = null;
    setFetchMockData(existentWord);
    const isValidWord = await validateWord("");
    expect(isValidWord).toEqual(!!existentWord);
  });

  it("should return error if something went wrong", async () => {
    const error = "Something went wrong";
    setFetchMockError(error);
    const randomWordResponse = await validateWord("");
    expect(randomWordResponse).toEqual(error);
  });
});
