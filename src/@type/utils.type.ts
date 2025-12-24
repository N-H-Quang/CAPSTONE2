import { HttpStatusCode } from "axios";

export interface APIResponse<T> {
  statusCode: HttpStatusCode;
  content: T;
  message: string;
  dateTime: string;
  messageConstants: null | string;
}

export type SuccessResponse<T> = APIResponse<T> & {
  statusCode: HttpStatusCode.Ok | HttpStatusCode.Created;
};

export type ErrorResponse<T> = APIResponse<T> & {
  statusCode:
    | HttpStatusCode.BadRequest
    | HttpStatusCode.Unauthorized
    | HttpStatusCode.Forbidden
    | HttpStatusCode.NotFound
    | HttpStatusCode.InternalServerError;
  content: T;
};
