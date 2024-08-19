export const SEARCH_ALL_VICTIMS = "https://dummyjson.com/users/search";

export const USER_LOGIN_URL = "auth/login";
export const EXPORTER_LOGIN_URL = "auth/login/exporter";
export const OFFTAKER_LOGIN_URL = "auth/login/offtaker";
export const AGENCY_LOGIN_URL = "agency/login";
export const ADMIN_LOGIN_URL = "admin/login";
export const USER_SIGNUP_URL = "auth/signup";
export const PARTIAL_USER_CREATION_URL = "auth/create-partialuser";
export const USER_VERIFY_URL = "auth/verify";
export const USER_FORGET_URL = "auth/forgot-password";
export const USER_RESET_URL = "auth/reset-password";
export const USER_CHANGE_PASSWORD_URL = (id: string) =>
  `auth/${id}/change-password`;

// farmer urls
export const GET_ALL_MESSAGES_URL = () => `contact-list/all-messages`;
export const GET_SINGLE_MESSAGES_URL = (id: string) =>
  `contact-list/single-messages/${id}`;
export const UPDATE_MESSAGES_STATUS_URL = (id: string) =>
  `contact-list/update-status/${id}`;
export const UPDATE_MESSAGES_VIEWS_COUNT = (id: string) =>
  `contact-list/update-message-views/${id}`;
