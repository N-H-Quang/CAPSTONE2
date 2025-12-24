import { UserResponse } from "@/@type/response.type";
import { URL_LOGIN } from "@/apis/auth.api";
import {
  clearAuthFromLSWithoutEvent,
  getAccessTokenFromLS,
  LocalStorageEventTarget,
  setAccessTokenToLS,
  setProfileToLS,
} from "@/utils/auth";
import axios, { AxiosError, type AxiosInstance } from "axios";
import { omit } from "lodash";
import { isAxiosUnauthorizedError } from "./utils";
import { ErrorResponse } from "@/@type/utils.type";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
        TokenCybersoft: process.env.REACT_APP_SECRET_TOKEN || "",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN) {
          const data = response.data.content as UserResponse;
          this.accessToken = data.accessToken
            ? "Bearer " + data.accessToken
            : "";
          setAccessTokenToLS(this.accessToken);
          const useData = omit(data, ["accessToken"]);
          setProfileToLS(useData);
        }
        return response;
      },
      (error: AxiosError) => {
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          clearAuthFromLSWithoutEvent();
          setTimeout(() => {
            const clearLSEvent = new Event("clearLS");
            LocalStorageEventTarget.dispatchEvent(clearLSEvent);
          }, 0);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
