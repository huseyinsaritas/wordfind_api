import { Schema, model, models, Model } from "mongoose";
import { User } from "../../model/User";

const DbUserDataSchema_TR = new Schema<User>(
  {
    username: { type: String },
    deviceId: { type: String },
    gameCount: { type: Number },
    updatedTime: { type: Number },
  },
  {
    versionKey: false,
  }
);

export const DbUserDataDocument = (models.DbWordData_TR as Model<User, {}, {}, {}>) || model("User", DbUserDataSchema_TR, "user");
