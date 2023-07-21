import React from "react";
import { withContext } from "../../test-utils";
import { renderHook, act } from "@testing-library/react";
import { useKeyUp } from "./useKeyUp";
import { playlist } from "./useSoundFx";

interface KeyUpProps {
  isRowActive: boolean;
  setFocusedInputIdx: (idx: number) => void;
  setActiveRowIdx: (idx: number) => void;
  activeRowIdx: number;
  rowWord: string[];
  setRowsWord: (x: string[]) => void;
  focusedInputIdx: number;
  wordLength: number;
  randomWord: string;
}

describe("useKeyUp", () => {
  const customProps: KeyUpProps = {
    isRowActive: true,
    setFocusedInputIdx: jest.fn(),
    setActiveRowIdx: jest.fn(),
    activeRowIdx: 0,
    rowWord: [],
    setRowsWord: jest.fn(),
    focusedInputIdx: 0,
    wordLength: 4,
    randomWord: "test",
  };

  const customContextValues = {
    playlist: playlist,
    userSettings: {
      isHardModeActive: false,
    },
    playSound: jest.fn(),
    handleGlobalWordValidation: jest.fn(),
    validateRealWord: jest.fn(),
    setNotification: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    customProps.isRowActive = true;
    customProps.activeRowIdx = 0;
    customProps.focusedInputIdx = 0;
    customProps.rowWord = [];
    customContextValues.userSettings.isHardModeActive = false;
  });

  it("should move to the next input when a letter is pressed and the row is active if the input index is not the last", () => {
    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "a";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledWith(
      customProps.focusedInputIdx + 1
    );
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledWith([keyPressed]);
    expect(customContextValues.playSound).toHaveBeenCalledWith(
      playlist.Keyboard
    );
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should do nothing if the row is not active", async () => {
    customProps.isRowActive = false;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "a";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledTimes(0);
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should do nothing if the row is not active", async () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["t", "e", "s", "t"];
    customProps.focusedInputIdx = 3;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "a";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledWith(["t", "e", "s", "a"]);
    expect(customContextValues.playSound).toHaveBeenCalledWith(
      playlist.Keyboard
    );
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should delete the letter and stay in the input when press backspace in a box not empty", () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["t", "e", "s", "t"];
    customProps.focusedInputIdx = 3;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "backspace";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledWith(["t", "e", "s", ""]);
    expect(customContextValues.playSound).toHaveBeenCalledWith(
      playlist.Keyboard
    );
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should delete the letter and move to the previous input index when press backspace in an empty box", () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["t", "e", "s", ""];
    customProps.focusedInputIdx = 3;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "backspace";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledWith(
      customProps.focusedInputIdx - 1
    );
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledWith(
      playlist.Keyboard
    );
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should do nothing when press backspace in the position 0 in an empty box", () => {
    customProps.isRowActive = true;
    customProps.rowWord = [];
    customProps.focusedInputIdx = 0;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "backspace";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledWith(
      playlist.Keyboard
    );
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should do nothing if press enter when the word does not match the word length", () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["a", "s", "d"];
    customProps.focusedInputIdx = 3;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "enter";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledTimes(0);
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should move to the next row when the word match the word lenght and press enter and isHardModeActive is false", async () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["a", "s", "d", "a"];
    customProps.focusedInputIdx = 3;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "enter";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    await act(async () => {
      result.current.handleKeyUp(typedEvent);
      await Promise.resolve(setTimeout(() => {}, 0));
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledWith(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledWith(
      customProps.activeRowIdx + 1
    );
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledWith(playlist.Try);
    expect(customContextValues.handleGlobalWordValidation).toHaveBeenCalledWith(
      [
        { letter: "a", ocurrences: 0, value: -1 },
        { letter: "s", ocurrences: 1, value: 0 },
        { letter: "d", ocurrences: 0, value: -1 },
        { letter: "a", ocurrences: 0, value: -1 },
      ]
    );
    expect(customContextValues.validateRealWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([
      { letter: "a", ocurrences: 0, value: -1 },
      { letter: "s", ocurrences: 1, value: 0 },
      { letter: "d", ocurrences: 0, value: -1 },
      { letter: "a", ocurrences: 0, value: -1 },
    ]);
  });
  it("should not move to the next row when the word match the word lenght and press enter when isHardModeActive is true but the word is not a real word", async () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["a", "s", "d", "a"];
    customProps.focusedInputIdx = 3;
    customContextValues.userSettings.isHardModeActive = true;

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "enter";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    await act(async () => {
      result.current.handleKeyUp(typedEvent);
      await Promise.resolve(setTimeout(() => {}, 0));
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledTimes(0);
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledTimes(0);
    expect(
      customContextValues.handleGlobalWordValidation
    ).toHaveBeenCalledTimes(0);
    expect(customContextValues.validateRealWord).toHaveBeenCalledWith("asda");
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(1);
    expect(result.current.wordInputValidation).toStrictEqual([]);
  });
  it("should move to the next row when the word match the word lenght and press enter when isHardModeActive is true and the word is a real word", async () => {
    customProps.isRowActive = true;
    customProps.rowWord = ["t", "e", "s", "t"];
    customProps.focusedInputIdx = 3;
    customContextValues.userSettings.isHardModeActive = true;
    customContextValues.validateRealWord.mockReturnValue(true);

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "enter";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    await act(async () => {
      result.current.handleKeyUp(typedEvent);
      await Promise.resolve(setTimeout(() => {}, 2000));
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledWith(0);
    expect(customProps.setActiveRowIdx).toHaveBeenCalledWith(
      customProps.activeRowIdx + 1
    );
    expect(customProps.setRowsWord).toHaveBeenCalledTimes(0);
    expect(customContextValues.playSound).toHaveBeenCalledWith(playlist.Try);
    expect(customContextValues.handleGlobalWordValidation).toHaveBeenCalledWith(
      [
        { letter: "t", ocurrences: 2, value: 1 },
        { letter: "e", ocurrences: 1, value: 1 },
        { letter: "s", ocurrences: 1, value: 1 },
        { letter: "t", ocurrences: 2, value: 1 },
      ]
    );
    expect(customContextValues.validateRealWord).toHaveBeenCalledWith("test");
    expect(customContextValues.setNotification).toHaveBeenCalledTimes(0);
    expect(result.current.wordInputValidation).toStrictEqual([
      { letter: "t", ocurrences: 2, value: 1 },
      { letter: "e", ocurrences: 1, value: 1 },
      { letter: "s", ocurrences: 1, value: 1 },
      { letter: "t", ocurrences: 2, value: 1 },
    ]);
  });
  it("should work if rowWord is undefined or null", () => {
    customProps.rowWord = null as unknown as string[];

    const { result } = renderHook(() => useKeyUp({ ...customProps }), {
      wrapper: ({ children }) =>
        withContext(children, { ...customContextValues }),
    });

    const keyPressed = "a";

    const event = new KeyboardEvent("keyup", {
      key: keyPressed,
      bubbles: true,
    });

    const typedEvent = event as unknown as React.KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.handleKeyUp(typedEvent);
    });

    expect(customProps.setFocusedInputIdx).toHaveBeenCalledTimes(1);
  });
});
