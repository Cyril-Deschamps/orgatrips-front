export const BASE = "" as const;
export const BASE_LINK = `/${BASE}` as const;

export const HELP = "/help" as const;
export const HELP_LINK = `${BASE}${HELP}` as const;

export const TRIP = "/trips-results" as const;
export const TRIP_LINK = `${BASE}${TRIP}` as const;

export const BLOG = "/blog" as const;
export const BLOG_LINK = `${BASE}${BLOG}` as const;

export const LOGIN = "/login" as const;
export const LOGIN_LINK = `${LOGIN}` as const;

export const REGISTER = "/register" as const;
export const REGISTER_LINK = `${REGISTER}` as const;

export const ACCOUNT = "/account" as const;
export const ACCOUNT_LINK = `${BASE}${ACCOUNT}` as const;
