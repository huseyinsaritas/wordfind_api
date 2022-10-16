import { Schema, model, models, Model } from "mongoose";
import { DailyGame } from "../../model/DailyGame";

const DailyGame = new Schema<DailyGame>({
  lan: { type: String },
  dayUN: { type: Number },
  gameId: { type: Number },
});

export const DailyGameDocument = (models.DailyGame as Model<DailyGame, {}, {}, {}>) || model("DailyGame", DailyGame, "words_daily");
