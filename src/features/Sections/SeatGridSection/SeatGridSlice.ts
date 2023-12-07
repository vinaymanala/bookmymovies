import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  seatCount: 0,
};

//SLICE
export const bookingReducer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSeatCount: (state = initialState, action: PayloadAction<number>) => {
      state.seatCount = action.payload;
    },
  },
});

export const { setSeatCount } = bookingReducer.actions;
export default bookingReducer.reducer;
