import { WordData } from "../model/WordData";
import { dbConnect } from "../db/dbConnect";
import { DbWordDataDocument_EN, DbWordDataDocument_TR } from "../db/documents/DbWordDataDocument";
import { maxId } from "../helper/maxId";
import { randomId } from "../helper/randomId";
// import { Seven } from "../data/Seven";

export const getWordData = async (len: number, language: "TR" | "EN"): Promise<WordData | null> => {
  const document = language === "TR" ? DbWordDataDocument_TR : DbWordDataDocument_EN;
  const maxNum = maxId(len);
  const id = randomId(maxNum);
  await dbConnect();
  const row = await document.findOne<WordData>({ len, id }).exec();
  return row;
};

// export const insertData = async (): Promise<any> => {
//   await dbConnect();

//   DbWordDataDocument_TR.insertMany(Seven, (err, res) => {
//     if (err) throw err;
//     console.log("Successfully inserted: " + res);
//   });
// };
