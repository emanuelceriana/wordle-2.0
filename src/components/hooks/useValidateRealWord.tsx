import { useCallback } from "react";
import { QueryClient } from "react-query";
import { validateWord } from "../../api/index";

interface ValidateRealWord {
  queryClient: QueryClient;
}

export const useValidateRealWord = ({ queryClient }: ValidateRealWord) => {
  const validate = useCallback(
    async (word: string) => {
      let isValidWord = false;
      try {
        isValidWord = await queryClient.fetchQuery(["randomWord", word], () =>
          validateWord(word)
        );
        if (typeof isValidWord !== "boolean") {
          throw new Error("Invalid response");
        }
      } catch {
        return false;
      }
      return isValidWord;
    },

    [queryClient]
  );

  return {
    validate,
  };
};
