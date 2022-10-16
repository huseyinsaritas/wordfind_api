import { dbConnect } from "../db/dbConnect";
import { DbUserDataDocument } from "../db/documents/UserDocument";
import { User } from "../model/User";

export const getUser = async (deviceId: string): Promise<User | null> => {
  await dbConnect();
  const row = await DbUserDataDocument.findOne<User>({ deviceId }).exec();
  return row;
};
