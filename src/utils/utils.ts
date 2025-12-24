import axios, { AxiosError, HttpStatusCode } from "axios";
import type { APIResponse, SuccessResponse } from "../@type/utils.type";

export const isSuccessResponse = <T>(
  response: APIResponse<T>
): response is SuccessResponse<T> => {
  return (
    response.statusCode === HttpStatusCode.Ok ||
    response.statusCode === HttpStatusCode.Created
  );
};

export const isAxiosError = <T>(
  response: unknown
):response is AxiosError<T> => {
  return axios.isAxiosError(response);
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}