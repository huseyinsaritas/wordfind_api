import { WordData } from "../model/WordData";
import { dbConnect } from "../db/dbConnect";
import { DbWordDataDocument_EN, DbWordDataDocument_TR } from "../db/documents/DbWordDataDocument";

export const isValidWord = async (item: string, language: "TR" | "EN"): Promise<boolean> => {
  const document = language === "TR" ? DbWordDataDocument_TR : DbWordDataDocument_EN;

  await dbConnect();
  const row = await document.findOne<WordData>({ item }).exec();

  if (row === null) {
    return false;
  }
  return true;
};
