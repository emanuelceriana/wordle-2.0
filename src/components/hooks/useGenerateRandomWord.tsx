import { useCallback } from "react";
import wordsDS from "../../data/wordsDataSet.json";

interface GetRandomWordProps {
  wordLength: number;
}

export const useGenerateRandomWord = ({ wordLength }: GetRandomWordProps) => {
  const generate = useCallback(() => {
    let possibleWords: string[] = [];

    for (const [key, words] of Object.entries(wordsDS)) {
      if (key === wordLength.toString()) {
        possibleWords = words;
      }
    }

    const randomIndex: number = Math.floor(
      Math.random() * possibleWords.length
    );
    return possibleWords[randomIndex];
  }, [wordLength]);

  return {
    generate,
  };
};
