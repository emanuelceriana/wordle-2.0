import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ObjectList {
  id: string;
}

interface CreateObjectList {
  length: number;
}

export const useCreateObjectList = ({ length }: CreateObjectList) => {
  const [objectList, setObjectList] = useState<ObjectList[]>([]);

  useEffect(() => {
    const objectsArray: ObjectList[] = new Array(length)
      .fill(0)
      .map(() => ({ id: `grid-${uuidv4()}` }));
    setObjectList(objectsArray);
  }, [length]);

  return {
    objectList,
  };
};
