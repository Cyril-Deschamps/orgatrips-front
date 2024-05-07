// TODO: refactor user types

import { parseISO } from "date-fns";

/* Public User returned from API */
export interface User {
  id: number;
  email: string;
  lastname: string | null;
  firstname: string | null;
  admin: boolean;
  createdAt: Date;
}

export interface UserRaw extends Omit<User, "createdAt"> {
  id: number;
  email: string;
  lastname: string | null;
  firstname: string | null;
  admin: boolean;
  createdAt: string;
}

/* User for login */
export interface UserToLogin {
  email: string;
  password: string;
}

export interface UserToRegister {
  email: string;
  password: string;
  lastname: string | null;
  firstname: string | null;
}

/* User sent from login */
export interface LoggedUser extends Pick<User, "id"> {
  xsrfToken: string;
}

export interface LoggedUserRaw extends UserRaw {
  xsrfToken: string;
}

export interface UserPasswordForm {
  oldPwd: UserToLogin["password"];
  newPwd: UserToLogin["password"];
}

export function getShortName(
  user: Pick<User, "firstname" | "lastname">,
): string {
  return user.firstname && user.lastname
    ? `${user.firstname.slice(0, 1)}. ${user.lastname}`
    : "Votre compte";
}

export function getFullName(
  user: Pick<User, "firstname" | "lastname">,
): string {
  return `${user.firstname ?? ""} ${
    user.lastname ? user.lastname.toUpperCase() : ""
  }`;
}

export function mapUserRawToUser(user: UserRaw): User;
export function mapUserRawToUser(user: LoggedUserRaw): User & LoggedUser;
export function mapUserRawToUser(
  user: UserRaw | LoggedUserRaw,
): User | (User & LoggedUser) {
  return {
    ...user,
    createdAt: parseISO(user.createdAt),
  };
}
