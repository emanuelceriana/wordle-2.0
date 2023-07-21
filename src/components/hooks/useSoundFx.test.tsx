import { renderHook, act } from "@testing-library/react";
import { useSoundFx } from "./useSoundFx";

describe("useSoundFx", () => {
  const playMock = jest.spyOn(Audio.prototype, "play").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call Audio.play when call play function", async () => {
    const {
      result: {
        current: { play, playlist },
      },
    } = renderHook(() => useSoundFx({ isSoundFxActive: true }));

    act(() => {
      play(playlist.Win);
    });

    expect(playMock).toHaveBeenCalledTimes(1);
  });
  it("should not call Audio.play if isSoundActive is false", async () => {
    const {
      result: {
        current: { play, playlist },
      },
    } = renderHook(() => useSoundFx({ isSoundFxActive: false }));

    act(() => {
      play(playlist.Win);
    });

    expect(playMock).toHaveBeenCalledTimes(0);
  });
});
