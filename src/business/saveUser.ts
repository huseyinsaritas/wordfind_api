import { dbConnect } from "../db/dbConnect";
import { DbUserDataDocument } from "../db/documents/UserDocument";
import { User } from "../model/User";

export const saveUser = async (newUser: User) => {
  await dbConnect();
  const user = await DbUserDataDocument.findOne({ deviceId: newUser.deviceId, username: newUser.username }).exec();
  if (user === null) return DbUserDataDocument.create<User>(newUser);

  if (user.deviceId === newUser.deviceId) {
    user.gameCount = newUser.gameCount;
    user.updatedTime = newUser.updatedTime;
    return user.save();
  }
};
