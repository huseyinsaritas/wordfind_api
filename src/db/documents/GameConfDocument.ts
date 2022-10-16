import { Schema, model, models, Model, Types } from "mongoose";
import { GameConf } from "../../model/GameConf";

const GameConfSchema = new Schema<GameConf>({
  version: { type: String },
  adsCycle: { type: Number },
});

export const GameConfDocument = (models.GameConf as Model<GameConf, {}, {}, {}>) || model("GameConf", GameConfSchema, "game_config");
