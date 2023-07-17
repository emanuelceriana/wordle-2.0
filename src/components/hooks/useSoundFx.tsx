import { useCallback } from "react";

import KeyboardSound from "../../assets/keyboardSound.wav";
import LoseSound from "../../assets/loseSound.wav";
import NextWordSound from "../../assets/nextWordSound.wav";
import WinSound from "../../assets/winSound.wav";
import RevealHint from "../../assets/reveal.wav";
import MouseClick from "../../assets/mouseclick.wav";

export enum PlaylistValidKeys {
  Win = "Win",
  Lose = "Lose",
  Keyboard = "Keyboard",
  Try = "Try",
  Reveal = "Reveal",
  Click = "Click",
}

type Playlist = {
  [K in PlaylistValidKeys]: HTMLAudioElement;
};

const playlist: Playlist = {
  [PlaylistValidKeys.Win]: new Audio(WinSound),
  [PlaylistValidKeys.Lose]: new Audio(LoseSound),
  [PlaylistValidKeys.Keyboard]: new Audio(KeyboardSound),
  [PlaylistValidKeys.Try]: new Audio(NextWordSound),
  [PlaylistValidKeys.Reveal]: new Audio(RevealHint),
  [PlaylistValidKeys.Click]: new Audio(MouseClick),
};

interface SoundFxProps {
  isSoundFxActive: boolean;
}

export const useSoundFx = ({ isSoundFxActive }: SoundFxProps) => {
  const play = useCallback(
    (sound: HTMLAudioElement) => {
      if (isSoundFxActive) {
        sound.currentTime = 0;
        sound.play();
      }
    },
    [isSoundFxActive]
  );

  return {
    play,
    playlist,
  };
};
