import { dbConnect } from "../db/dbConnect";
import { GameConfDocument } from "../db/documents/GameConfDocument";
import { GameConf } from "../model/GameConf";

export const getGameConf = async (): Promise<GameConf | null> => {
  await dbConnect();
  const row = await GameConfDocument.findOne<GameConf>().exec();
  // console.log("row", row);
  return row;
};
