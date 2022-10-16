import { NextFunction, Request, Response } from "express";
import { getUser } from "../../business/getUser";
import { saveUser } from "../../business/saveUser";
import { ApiResponseErrorInternal, ApiResponseSuccess } from "../routes/ApiResponse";

export const userController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId = req.params.len;
      const user = await getUser(deviceId);
      if (user) return ApiResponseSuccess(res, user);

      return ApiResponseSuccess(res, {});
    } catch (error) {
      return ApiResponseErrorInternal(res);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const user = await saveUser(body);

      if (user) return ApiResponseSuccess(res, user);

      return ApiResponseSuccess(res, []);
    } catch (error) {
      console.log("error", error);
      return ApiResponseErrorInternal(res);
    }
  },
};
