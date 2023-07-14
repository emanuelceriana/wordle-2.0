import { shuffleArray } from "../utils";
import { dictionaryUrl } from "./urls";

interface Hint {
  entries: {
    senses: {
      shortDefinitions: string[];
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

            hint.entries[0].senses?.map(({ shortDefinitions }) => {
              shortDefinitions &&
                shortDefinitionsArray.push(shortDefinitions[0]);
            });

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
