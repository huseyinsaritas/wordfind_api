import { Response } from "express";

type ApiResponse<T> = {
  success: boolean;
  message: string; // "Success"
  data: T;
};

const apiResponseSuccessMessage = <T>(data: T): ApiResponse<T> => ({
  success: true,
  message: "success",
  data,
});

const apiResponseErrorMessage = (message: string): ApiResponse<undefined> => ({
  success: false,
  message,
  data: undefined,
});

export const ApiResponseSuccess = <T>(response: Response, data: T): Response<any, Record<string, any>> => response.status(200).send(apiResponseSuccessMessage<T>(data));

export const ApiResponseError = (response: Response, message: string): Response<any, Record<string, any>> => response.status(403).send(apiResponseErrorMessage(message));

export const ApiResponseErrorNotFound = (response: Response) => response.status(404).send(apiResponseErrorMessage("Not found."));

export const ApiResponseErrorInternal = (response: Response) => response.status(501).send(apiResponseErrorMessage("Internal server error."));
