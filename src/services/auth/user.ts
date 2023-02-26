// TODO: refactor user types

import { parseISO } from "date-fns";

/* Public User returned from API */
export interface User {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  phone: string;
  companyName: string;
  position: Position;
  siret: string;
  validationDate: Date | null;
  Kyc: UserKyc;
  superAdmin: boolean;
}

export interface UserRaw {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  phone: string;
  companyName: string;
  position: Position;
  siret: string;
  validationDate: string | null;
  Kyc: UserKyc | null;
  superAdmin: boolean;
}

export enum Position {
  "SALESMAN",
  "SALES_MANAGER",
  "PURCHASING_MANAGER",
  "GENERAL_MANAGER",
  "BRANCH_MANAGER",
  "OPERATIONAL_MANAGER",
  "OTHER",
}

/* User for login */
export interface UserToLogin {
  email: string;
  password: string;
}

/* User sent from login */
export interface LoggedUser extends User {
  xsrfToken: string;
}

export interface LoggedUserRaw extends UserRaw {
  xsrfToken: string;
}

/* User register to send to api*/
export interface UserToRegister {
  email: string;
  password: string;
  lastname: string | null;
  firstname: string | null;
}

/* User register for register form*/
export interface UserToRegisterForm extends UserToRegister {
  passwordConfirmation: string;
  termsOfUse: boolean;
  securityPolicy: boolean;
  gRecaptchaToken: string;
}

export interface UserToUpdateForm extends User {}

export interface UserPasswordForm {
  oldPwd: UserToLogin["password"];
  newPwd: UserToLogin["password"];
}

export interface UserKyc {
  kbis: string | null;
  identity: string | null;
  bank: string | null;
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
  return `${user.firstname} ${user.lastname.toUpperCase()}`;
}

export function getInitials(
  user: Pick<User, "firstname" | "lastname">,
): string {
  return user.firstname && user.lastname
    ? `${user.firstname.slice(0, 1)}${user.lastname.slice(0, 1)}`
    : "Votre compte";
}

export function mapUserRawToUser(user: UserRaw): User;
export function mapUserRawToUser(user: LoggedUserRaw): LoggedUser;
export function mapUserRawToUser(
  user: UserRaw | LoggedUserRaw,
): User | LoggedUser {
  return {
    ...user,
    validationDate:
      user.validationDate !== null ? parseISO(user.validationDate) : null,
    Kyc: user.Kyc || {
      kbis: null,
      identity: null,
      bank: null,
    },
  };
}
