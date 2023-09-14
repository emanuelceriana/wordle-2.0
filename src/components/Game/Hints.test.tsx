import { fireEvent, act } from "@testing-library/react";
import * as ReactQuery from "react-query";

import { Hints } from "./Hints";
import { playlist } from "../hooks/useSoundFx";
import { renderWithContext } from "../../test-utils";

interface MockValueContext {
  randomWord: string;
  playSound: jest.Mock<any, any>;
  playlist: typeof playlist;
}

describe("<Hints />", () => {
  const mockValueContext: MockValueContext = {
    randomWord: "test",
    playSound: jest.fn(),
    playlist: playlist,
  };

  const mockedRefetch = jest.fn();
  //   jest.mock("react-query");

  const mockedUseQuery = jest.spyOn(ReactQuery, "useQuery");

  const defaultUseQueryMockedValues = {
    data: [],
    error: null,
    isLoading: false,
    refetch: mockedRefetch,
  } as any;

  mockedUseQuery.mockReturnValue(defaultUseQueryMockedValues);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<Hints />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should fecth hints, play sound and show hints", async () => {
    const hint = [{ lexicalCategory: "adj", shortDefinitions: "just a test" }];

    mockedUseQuery.mockReturnValue({
      ...defaultUseQueryMockedValues,
      data: hint,
    });

    const { getByTestId, queryByText } = renderWithContext(
      <Hints />,
      mockValueContext
    );

    const hintButton = getByTestId("hintButton");
    let lexicalCategory = queryByText("adj");
    let shortDefinitions = queryByText("just a test");

    expect(lexicalCategory).toBe(null);
    expect(shortDefinitions).toBe(null);

    act(() => {
      fireEvent.click(hintButton);
      lexicalCategory = queryByText("adj");
      shortDefinitions = queryByText("just a test");
    });

    expect(mockedRefetch).toBeCalledTimes(1);
    expect(mockValueContext.playSound).toBeCalledTimes(1);
    expect(lexicalCategory).toBeDefined();
    expect(shortDefinitions).toBeDefined();
  });

  it("should show next and previous hint when click arrow buttons", () => {
    const hint = [
      { lexicalCategory: "adj", shortDefinitions: "just a test" },
      { lexicalCategory: "noun", shortDefinitions: "next test" },
    ];

    mockedUseQuery.mockReturnValue({
      ...defaultUseQueryMockedValues,
      data: hint,
    });

    const { getByTestId, queryByText } = renderWithContext(
      <Hints />,
      mockValueContext
    );

    const hintButton = getByTestId("hintButton");

    act(() => {
      fireEvent.click(hintButton);
    });

    const nextHintButton = getByTestId("nextHint");

    act(() => {
      fireEvent.click(nextHintButton);
    });

    let lexicalCategory = queryByText("noun");
    let shortDefinitions = queryByText("next test");

    expect(lexicalCategory).toBeDefined();
    expect(shortDefinitions).toBeDefined();

    const previousHintButton = getByTestId("previousHint");

    act(() => {
      fireEvent.click(previousHintButton);
    });

    lexicalCategory = queryByText("adj");
    shortDefinitions = queryByText("just a test");

    expect(lexicalCategory).toBeDefined();
    expect(shortDefinitions).toBeDefined();
  });

  it("should show correct text when is fetching hints", () => {
    mockedUseQuery.mockReturnValue({
      ...defaultUseQueryMockedValues,
      isLoading: true,
    });

    const { queryByText } = renderWithContext(<Hints />, mockValueContext);

    const loadingText = queryByText("Searching hints...");
    expect(loadingText).toBeDefined();
  });

  it("should show correct text when there's an error", () => {
    mockedUseQuery.mockReturnValue({
      ...defaultUseQueryMockedValues,
      isLoading: false,
      error: true,
    });

    const { queryByText } = renderWithContext(<Hints />, mockValueContext);

    const errorText = queryByText("Ups... you shouldn't be seeing this!");
    expect(errorText).toBeDefined();
  });
});
