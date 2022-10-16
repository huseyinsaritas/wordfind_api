import { WordData } from "./WordData";

export type DailyGame = {
  lan: string;
  dayUN: number;
  gameId: number;
};

export type DailyGameData = {
  dayUn: number;
  gameId: number;
  wordData: WordData;
  played: boolean;
  win: boolean;
};
