import { useEffect, useState } from "react";
import wordsDS from "../../data/wordsDataSet.json";

interface GetRandomWordProps {
  wordLength: number;
}

export const useGetRandomWord = ({ wordLength }: GetRandomWordProps) => {
  const [randomWord, setRandomWord] = useState<string>();

  useEffect(() => {
    let possibleWords: string[] = [];

    for (const [key, words] of Object.entries(wordsDS)) {
      if (key === wordLength.toString()) {
        possibleWords = words;
      }
    }

    const randomIndex: number = Math.floor(
      Math.random() * possibleWords.length
    );
    setRandomWord(possibleWords[randomIndex]);
  }, [wordLength]);

  return {
    randomWord,
  };
};
