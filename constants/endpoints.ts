const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(
  /\/?$/,
  "/",
);

export const Endpoints = {
  login: baseUrl + "api/login",
  signup: baseUrl + "api/signup",
  updateUser: baseUrl + "api/user",
  getAllEntries: baseUrl + "api/diary",
  updateEntry: baseUrl + "api/diary",
  createEntry: baseUrl + "api/diary",
  deleteEntry: baseUrl + "api/diary",
  forgotPass: baseUrl + "api/forgot-password",
};
