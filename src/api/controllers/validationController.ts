import { NextFunction, Request, Response } from "express";
import { isValidWord } from "../../business/isValidWord";
import { ApiResponseErrorInternal, ApiResponseSuccess } from "../routes/ApiResponse";

export const validationController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = req.params.word;
      let param = req.params.lan.toUpperCase();
      const lan = param !== "EN" ? "TR" : "EN";

      const isValid = await isValidWord(item, lan);

      return ApiResponseSuccess(res, isValid);
    } catch (error) {
      console.log("error", error);
      return ApiResponseErrorInternal(res);
    }
  },

  getTr: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = req.params.word;
      const isValid = await isValidWord(item, "TR");

      return ApiResponseSuccess(res, isValid);
    } catch (error) {
      console.log("error", error);
      return ApiResponseErrorInternal(res);
    }
  },
};
