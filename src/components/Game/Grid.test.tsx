import { Grid } from "./Grid";
import { fireEvent, act } from "@testing-library/react";
import { renderWithContext } from "../../test-utils";
import * as Hints from "./Hints";
import { playlist } from "../hooks/useSoundFx";

interface MockValueContext {
  activeRowIdx: number;
  triesCount: number;
  wordLength: number;
  globalWordValidation: number[];
  playlist: typeof playlist;
  playSound: () => void;
}

describe("<Grid />", () => {
  let mockValueContext: MockValueContext = {
    activeRowIdx: 0,
    triesCount: 0,
    wordLength: 5,
    globalWordValidation: [],
    playlist: playlist,
    playSound: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.spyOn(Hints, "Hints").mockImplementation(() => <div></div>);

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<Grid />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the quantity of rows depending on the triesCount value", () => {
    const triesCount = 4;
    mockValueContext.triesCount = 4;

    const { queryAllByTestId } = renderWithContext(<Grid />, mockValueContext);

    const rows = queryAllByTestId("gridRow");

    expect(rows.length).toBe(triesCount);
  });

  it("should set letterBlock value when user press key", () => {
    mockValueContext.triesCount = 1;

    const { queryAllByTestId } = renderWithContext(<Grid />, mockValueContext);

    act(() => {
      fireEvent.keyUp(queryAllByTestId("letterBlock")[0], {
        key: "a",
        bubbles: true,
      });
    });

    expect(queryAllByTestId("letterBlock")[0].textContent).toBe("a");
  });
});
