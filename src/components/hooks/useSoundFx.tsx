import { useCallback } from "react";

import KeyboardSound from "../../assets/keyboardSound.wav";
import LoseSound from "../../assets/loseSound.wav";
import NextWordSound from "../../assets/nextWordSound.wav";
import WinSound from "../../assets/winSound.wav";

export enum PlaylistValidKeys {
  Win = "winSound",
  Lose = "loseSound",
  Keyboard = "keyboardSound",
  Try = "nextTrySound",
}

type Playlist = {
  [K in PlaylistValidKeys]: string;
};

const playlist: Playlist = {
  [PlaylistValidKeys.Win]: WinSound,
  [PlaylistValidKeys.Lose]: LoseSound,
  [PlaylistValidKeys.Keyboard]: KeyboardSound,
  [PlaylistValidKeys.Try]: NextWordSound,
};

interface SoundFxProps {
  isSoundFxActive: boolean;
}

export const useSoundFx = ({ isSoundFxActive }: SoundFxProps) => {
  const play = useCallback(
    (sound: PlaylistValidKeys) => {
      isSoundFxActive && new Audio(playlist[sound]).play();
    },
    [isSoundFxActive]
  );

  return {
    play,
    playlist: PlaylistValidKeys,
  };
};
