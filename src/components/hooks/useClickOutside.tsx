import React, { useCallback, useEffect } from "react";

interface ClickOutsideProps {
  rowRefs: React.MutableRefObject<HTMLDivElement[]>;
  activeRowIdx: number;
}

const useClickOutside = ({ rowRefs, activeRowIdx }: ClickOutsideProps) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as Node;
      if (!rowRefs?.current[activeRowIdx]?.contains(targetElement)) {
        setTimeout(() => rowRefs?.current[activeRowIdx]?.focus(), 0);
      }
    },
    [rowRefs, activeRowIdx]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;
