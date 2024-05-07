"use client";

import axios, { AxiosPromise } from "axios";
import { baseURL } from "./config";
import logger from "./logger";
import { parse as parseContentDisposition } from "content-disposition";
import {
  LoggedUser,
  LoggedUserRaw,
  User,
  UserForm,
  UserPasswordForm,
  UserRaw,
  UserToLogin,
} from "./user";

const LOCAL_STORAGE_USER_KEY = "user";

const baseAPI = axios.create({
  baseURL,
  xsrfCookieName: "XSRF-TOKEN",
  url: "/",
  headers: {},
  timeout: 10000,
  withCredentials: true,
});

baseAPI.interceptors.response.use(
  (response) => {
    logger.debug(response.config.url, response.data);
    return response;
  },
  (error) => {
    logger.debug(error.config.url, error.data);
    return Promise.reject(error);
  },
);

export function login(user: UserToLogin): AxiosPromise<{
  user: LoggedUserRaw;
  message: string;
}> {
  return baseAPI.post("/login", user);
}

export function logout(): AxiosPromise<void> {
  return baseAPI.get("/logout");
}

export function getLocalUser(): LoggedUser {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_KEY) as string,
  ) as LoggedUser;
}

export function setLocalUser(user: LoggedUser): void {
  return localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}

export function isSetLocalUser(): boolean {
  return localStorage.getItem("user") !== null;
}

export function deleteLocalUser(): void {
  return localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export function getUserById(id: User["id"]): AxiosPromise<UserRaw> {
  return baseAPI.get("/users/" + id);
}

export function updateUserById(
  userId: User["id"],
  user: UserForm,
): AxiosPromise<UserRaw> {
  return baseAPI.put(`/users/${userId}`, user);
}

export function deleteUserById(userId: User["id"]): AxiosPromise<void> {
  return baseAPI.delete(`/users/${userId}`);
}

export function updateUserPasswordById(
  id: User["id"],
  form: UserPasswordForm,
): AxiosPromise<void> {
  return baseAPI.put("/users/" + id + "/update-pwd", form);
}

export function createAccount(user: UserForm): AxiosPromise<void> {
  return baseAPI.post("/users", user);
}

export interface ObjectURL {
  url: string;
  name?: string;
}

/**
 * Remember to revoke ObjectURL.url when done
 * @param url
 */
export function getObjectURL(url: string): Promise<ObjectURL> {
  return baseAPI
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      return {
        url: window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] }),
        ),
        name: parseContentDisposition(res.headers["content-disposition"])
          .parameters.filename,
      };
    });
}

export function downloadObjectURL(objectUrl: ObjectURL): void {
  const anchor = window.document.createElement("a");
  anchor.href = objectUrl.url;
  if (objectUrl.name) anchor.setAttribute("download", objectUrl.name);

  window.document.body.appendChild(anchor);
  anchor.click();
  window.document.body.removeChild(anchor);
  window.URL.revokeObjectURL(objectUrl.url);
}

export function download(url: string): Promise<void> {
  return getObjectURL(url).then(downloadObjectURL);
}

export default baseAPI;
