import { useEffect, useState } from "react";
import { championsData } from "../data";

const totalChampions = championsData.length;

interface Character {
  id: string;
  name: string;
  spell: string;
}

export function useGetChampion() {
  const [actualCharacter, setActualCharacter] = useState<Character>({
    id: " ",
    name: " ",
    spell: "",
  });

  const changeActualCharacter = () => {
    const currentChampion =
      championsData[Math.floor(Math.random() * totalChampions)];
    setActualCharacter({
      ...currentChampion,
      spell: currentChampion.spells[Math.floor(Math.random() * 4)],
    });
  };

  useEffect(() => {
    changeActualCharacter();
  }, []);

  return {
    actualCharacter,
    changeActualCharacter,
  };
}
