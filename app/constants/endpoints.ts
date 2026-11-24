const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const Endpoints = {
  login: baseUrl + "api/login",
  signup: baseUrl + "api/signup",
  getAllEntries: baseUrl + "api/diary",
};
