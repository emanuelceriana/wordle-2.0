export const getAmountOfLetters = (rowWord: string[]) => {
  let amountOfLetters = 0;
  rowWord.forEach((letter: string) => letter !== "" && amountOfLetters++);
  return amountOfLetters;
};

export interface ValidationArray {
  value: number;
  ocurrences: number;
  letter: string;
}

export const validateWord = (
  randomWord: string,
  rowWord: string[]
): ValidationArray[] => {
  const validationArray: ValidationArray[] = [];

  rowWord.forEach((letter: string, idx: number) => {
    const validationLetter = { value: -1, ocurrences: 0, letter: "" };

    if (randomWord.indexOf(letter) >= 0) {
      validationLetter.value = 0;
    }
    if (randomWord[idx] === letter) {
      validationLetter.value = 1;
    }

    validationLetter.ocurrences = randomWord
      .split("")
      .filter((l) => l === letter).length;

    validationLetter.letter = letter;

    validationArray[idx] = validationLetter;
  });

  return validationArray;
};

export const isCorrectWord = (validationArray: ValidationArray[]) => {
  const values: number[] = validationArray.map((vA) => vA.value);
  const uniqueValues: number[] = [...new Set(values)];
  return uniqueValues.length === 1 && uniqueValues[0] === 1;
};

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
