export const baseURL = "https://papertrading-qrht.onrender.com";

export const AUTH = {
  REGISTER: `${baseURL}/user/register`,
  LOGIN: `${baseURL}/user/login`,
  SEND_OTP: `${baseURL}/user/sendotp`,
  VERIFY_OTP: `${baseURL}/user/verifyotp`,
  USER_PROFILE: `${baseURL}/user/getuserprofile`,
};
export const USER_DETAIL = {
  WATCH_LIST: `${baseURL}/market/getwatchlist/`,
  ADD_WATCHLIST: `${baseURL}/market/addtowatchlist`,
  DELETE_WATCHLIST: `${baseURL}/market/removewatchlistitem/`,
  BUY_STOCK: `${baseURL}/market/buy`,
  SELL_STOCK: `${baseURL}/market/sell`,
  STOCK_HISTORY: `${baseURL}/market/getmystockhistory/`,
};
