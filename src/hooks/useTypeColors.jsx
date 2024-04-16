import { useMemo } from "react";
import typeColors from "../utils/typeColors";

const useTypeColors = (types) => {
  const typeColorsMemoized = useMemo(() => {
    return types.reduce((acc, typeData) => {
      acc[typeData.type.name] = typeColors[typeData.type.name].color;
      return acc;
    }, {});
  }, [types]);
};

export default useTypeColors;
