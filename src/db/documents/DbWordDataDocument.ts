import { Schema, model, models, Model } from "mongoose";

export interface DbWordData {
  id: number;
  len: number;
  item: string;
}

const DbWordDataSchema_TR = new Schema<DbWordData>(
  {
    id: { type: Number },
    len: { type: Number },
    item: { type: String },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const DbWordDataSchema_EN = new Schema<DbWordData>(
  {
    id: { type: Number },
    len: { type: Number },
    item: { type: String },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

export const DbWordDataDocument_TR = (models.DbWordData_TR as Model<DbWordData, {}, {}, {}>) || model("DbWordData_TR", DbWordDataSchema_TR, "words_tr");
export const DbWordDataDocument_EN = (models.DbWordData_EN as Model<DbWordData, {}, {}, {}>) || model("DbWordData_EN", DbWordDataSchema_EN, "words_en");
