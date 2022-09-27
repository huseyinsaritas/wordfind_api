import { NextFunction, Request, Response } from "express";
import { getWordData } from "../../business/getWordData";
import { ApiResponseErrorInternal, ApiResponseSuccess } from "../routes/ApiResponse";

export const gameController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const len = Number(req.params.len);
      let param = req.params.lan.toUpperCase();
      const lan = param !== "EN" ? "TR" : "EN";

      const wordData = await getWordData(len, lan);

      if (wordData) return ApiResponseSuccess(res, wordData);

      return ApiResponseSuccess(res, []);
    } catch (error) {
      console.log("error", error);
      return ApiResponseErrorInternal(res);
    }
  },

  getTr: async (req: Request, res: Response, next: NextFunction) => {
    console.log("here");

    try {
      const len = Number(req.params.len);
      const wordData = await getWordData(len, "TR");

      // await insertData();
      // if (insert) return ApiResponseSuccess(res, insert);

      if (wordData) return ApiResponseSuccess(res, wordData);

      return ApiResponseSuccess(res, []);
    } catch (error) {
      return ApiResponseErrorInternal(res);
    }
  },
};
