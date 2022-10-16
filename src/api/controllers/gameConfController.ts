import { NextFunction, Request, Response } from "express";
import { getGameConf } from "../../business/getGameConf";
import { ApiResponseErrorInternal, ApiResponseSuccess } from "../routes/ApiResponse";

export const gameConfController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameConf = await getGameConf();
      if (gameConf) return ApiResponseSuccess(res, gameConf);

      return ApiResponseSuccess(res, {});
    } catch (error) {
      return ApiResponseErrorInternal(res);
    }
  },
};
