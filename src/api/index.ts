import { shuffleArray } from "../utils";
import { dictionaryUrl, randomWordUrl } from "./urls";

interface Hint {
  entries: {
    senses: {
      definitions: string[];
    }[];
  }[];
  lexicalCategory: {
    text: string;
  };
}

export interface SimplifiedHint {
  shortDefinitions: string;
  lexicalCategory: string;
}

export const fetchHints = (word: string) => {
  return fetch(`${dictionaryUrl}/${word}`).then((response) => {
    return response
      .json()
      .then((data) => {
        let hints: SimplifiedHint[] = [];
        if (data) {
          data.results[0].lexicalEntries?.map((hint: Hint) => {
            const shortDefinitionsArray: string[] = [];

            hint.entries[0].senses?.map(({ definitions }) => {
              definitions &&
                definitions[0] !== "" &&
                shortDefinitionsArray.push(definitions[0]);
            });

            shortDefinitionsArray[0]?.length &&
              hints.push({
                shortDefinitions: shortDefinitionsArray[0],
                lexicalCategory: hint.lexicalCategory.text,
              });
          });
          shuffleArray(hints);
        }

        return hints;
      })
      .catch((error) => {
        return error;
      });
  });
};

export const fetchRandomWord = (wordLength: number) => {
  return fetch(`${randomWordUrl}?words=1&length=${wordLength}`).then(
    (response) => {
      return response
        .json()
        .then((data) => {
          return data?.[0];
        })
        .catch((error) => {
          return error;
        });
    }
  );
};

export const validateWord = (word: string) => {
  return fetch(`${dictionaryUrl}/${word}`).then((response) => {
    return response
      .json()
      .then((data) => {
        return !!data;
      })
      .catch((error) => {
        return error;
      });
  });
};
