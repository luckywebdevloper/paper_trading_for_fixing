import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH, USER_DETAIL } from "../../src/utils/baseURL";
// import { storage } from "../../src/components/storage";
import storageItems, {
  Get_User_Token,
  Store_User_Token,
} from "../../src/utils/storageItems";
import { Alert } from "react-native";

const initialState = {
  registerData: null,
  registerDataFailed: null,
  loginData: null,
  loginDataFailed: null,
  otpData: null,
  otpDataFailed: null,
  verifyOTPData: null,
  verifyOTPDataFailed: null,
  userProfileData: null,
  userProfileDataFailed: null,
  watch_ListData: null,
  watch_ListFailed: null,
  watch_List_Added: null,
  watch_List_Removed: null,
  watch_List_AddedFailed: null,
  watch_List_RemovedFailed: null,
  Delete_WatchList_Data: null,
  DELETE_WATCHLIST_Failed: null,
  BuyData: null,
  BuyDataFailed: null,
  StockHistoryData: null,
  StockHistoryDataFailed: null,
  SellData: null,
  SellDataFailed: null,

  loading: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: AUTH.REGISTER,
        data,
      };
      const results = await axios(config);
      // storageItems.storeUserToken(results.data.token);
      await Store_User_Token(results.data.token); // We use AsyncStorage
      return results.data;
    } catch (error) {
      console.log(error.response, "Er");
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: AUTH.LOGIN,
        data,
      };
      const results = await axios(config);
      // storageItems.storeUserToken(results.data.token); comment this because MTKK is not working on Expo GO
      await Store_User_Token(results.data.token); // We use AsyncStorage
      // console.log("internal", results);
      return results.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendOTP = createAsyncThunk(
  "auth/sentOTP",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();
    try {
      const config = {
        method: "POST",
        url: AUTH.SEND_OTP,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);

      return results.data;
    } catch (error) {
      // console.log(error.response);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();

    try {
      const config = {
        method: "POST",
        url: AUTH.VERIFY_OTP,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      // storageItems.storeUserToken(results.data.token);
      await Store_User_Token(results.data.token);
      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (_, { rejectWithValue }) => {
    let Token = await Get_User_Token();

    try {
      const config = {
        method: "GET",
        url: AUTH.USER_PROFILE,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const watch_List = createAsyncThunk(
  "auth/datail",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();
    // console.log(USER_DETAIL.WATCH_LIST + data, "url");
    try {
      const config = {
        method: "GET",
        url: USER_DETAIL.WATCH_LIST + data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      // console.log(results.data);
      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const get_Stock_History = createAsyncThunk(
  "get-history",
  async (_, { rejectWithValue }) => {
    let Token = await Get_User_Token();
    // console.log(USER_DETAIL.WATCH_LIST + data, "url");
    try {
      const config = {
        method: "GET",
        url: USER_DETAIL.STOCK_HISTORY,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      // console.log(results.data);
      console.log(
        results?.data,
        "History show--------------------------------"
      );

      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const ADD_STOCK_TO_WATCHLIST = createAsyncThunk(
  "add_watchlist",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();

    try {
      const config = {
        method: "POST",
        url: USER_DETAIL.ADD_WATCHLIST,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const BUY_STOCK = createAsyncThunk(
  "buy_stock",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();

    try {
      const config = {
        method: "POST",
        url: USER_DETAIL.BUY_STOCK,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);
      // console.log("its working fine ----------", results.data);

      return results.data;
    } catch (error) {
      // console.log("Something", error.response);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const SELL_STOCK = createAsyncThunk(
  "sell_stock",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();
    console.log(USER_DETAIL.SELL_STOCK, "URL");
    try {
      const config = {
        method: "POST",
        url: USER_DETAIL.SELL_STOCK,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const results = await axios(config);

      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const DELETE_WATCHLIST = createAsyncThunk(
  "delete_watchlist",
  async (data, { rejectWithValue }) => {
    let Token = await Get_User_Token();

    try {
      const config = {
        method: "DELETE",
        url: USER_DETAIL.DELETE_WATCHLIST + data,
        data,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };

      const results = await axios(config);
      // console.log(results?.data);
      return results.data;
    } catch (error) {
      console.log(error?.response);

      return rejectWithValue(error.response.data.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSellData: (state) => {
      state.SellData = null;
    },
    resetBuyData: (state) => {
      state.BuyData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerData = action.payload;
        state.registerDataFailed = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registerDataFailed = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.loginDataFailed = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginDataFailed = action.payload;
      })
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
        state.otpDataFailed = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.otpDataFailed = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyOTPData = action.payload;
        state.verifyOTPDataFailed = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.verifyOTPDataFailed = action.payload;
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = action.payload;
        state.userProfileDataFailed = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.userProfileDataFailed = action.payload;
      })
      .addCase(watch_List.rejected, (state, action) => {
        state.loading = false;
        state.watch_ListFailed = action.payload;
      })

      .addCase(watch_List.fulfilled, (state, action) => {
        state.loading = false;
        state.watch_ListData = action.payload;
        state.watch_ListFailed = null;
      })

      .addCase(watch_List.pending, (state) => {
        state.loading = true;
      })
      .addCase(ADD_STOCK_TO_WATCHLIST.pending, (state) => {
        state.loading = true;
      })

      .addCase(ADD_STOCK_TO_WATCHLIST.rejected, (state, action) => {
        state.loading = false;
        state.watch_List_AddedFailed = action.payload;
      })

      .addCase(ADD_STOCK_TO_WATCHLIST.fulfilled, (state, action) => {
        state.loading = false;
        state.watch_List_Added = action.payload;
        state.watch_List_AddedFailed = null;
      })
      .addCase(DELETE_WATCHLIST.fulfilled, (state, action) => {
        state.loading = false;
        state.Delete_WatchList_Data = action.payload;
        state.DELETE_WATCHLIST_Failed = null;
      })

      .addCase(DELETE_WATCHLIST.pending, (state) => {
        state.loading = true;
      })

      .addCase(DELETE_WATCHLIST.rejected, (state, action) => {
        state.loading = false;
        state.DELETE_WATCHLIST_Failed = action.payload;
      })
      .addCase(BUY_STOCK.rejected, (state, action) => {
        state.loading = false;
        state.BuyDataFailed = action.payload;
      })

      .addCase(BUY_STOCK.pending, (state) => {
        state.loading = true;
      })
      .addCase(BUY_STOCK.fulfilled, (state, action) => {
        state.loading = false;
        state.BuyData = action.payload;
        state.BuyDataFailed = null;
      })
      .addCase(get_Stock_History.rejected, (state, action) => {
        state.loading = false;
        state.StockHistoryDataFailed = action.payload;
      })

      .addCase(get_Stock_History.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Stock_History.fulfilled, (state, action) => {
        state.loading = false;
        state.StockHistoryData = action.payload;
        state.StockHistoryDataFailed = null;
      })
      .addCase(SELL_STOCK.rejected, (state, action) => {
        state.loading = false;
        state.SellDataFailed = action.payload;
      })

      .addCase(SELL_STOCK.pending, (state) => {
        state.loading = true;
      })
      .addCase(SELL_STOCK.fulfilled, (state, action) => {
        state.loading = false;
        state.SellData = action.payload;
        state.SellDataFailed = null;
      });
  },
});

export const { resetSellData, resetBuyData } = AuthSlice.actions;
export default AuthSlice.reducer;
