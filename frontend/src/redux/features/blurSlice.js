import { createSlice } from "@reduxjs/toolkit";

export const blurSlice = createSlice({
    name: "blur",
    initialState: {
      bluring: false
    },
    reducers: {
      setBlur: (state, action) => {

          console.log("payload ",action.payload)
        state.bluring = action.payload;
      },
    },
  });
  
  
  export const { setBlur } = blurSlice.actions;
  
  export default blurSlice.reducer;
  