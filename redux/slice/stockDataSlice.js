// slices/stockDataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStockData = createAsyncThunk(
  "stockData/fetchStockData",
  async () => {
    const response = await fetch(
      "https://stock-data-251j.onrender.com/api/allIndices"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const stockDataSlice = createSlice({
  name: "stockData",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default stockDataSlice.reducer;
