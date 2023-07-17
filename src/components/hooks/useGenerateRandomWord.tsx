import { useCallback } from "react";
import wordsDS from "../../data/wordsDataSet.json";
import { QueryClient } from "react-query";
import { fetchRandomWord } from "../../api";

interface GetRandomWordProps {
  wordLength: number;
  queryClient: QueryClient;
}

export const useGenerateRandomWord = ({
  wordLength,
  queryClient,
}: GetRandomWordProps) => {
  const generate = useCallback(async () => {
    let possibleWords: string[] = [];

    for (const [key, words] of Object.entries(wordsDS)) {
      if (key === wordLength.toString()) {
        possibleWords = words;
      }
    }

    const randomIndex: number = Math.floor(
      Math.random() * possibleWords.length
    );

    try {
      const randomWord = await queryClient.fetchQuery("randomWord", () =>
        fetchRandomWord(wordLength)
      );
      if (randomWord && randomWord != "") {
        return randomWord;
      }
    } catch {
      return possibleWords[randomIndex];
    }
  }, [wordLength, queryClient]);

  return {
    generate,
  };
};
