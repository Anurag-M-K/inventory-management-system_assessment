import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name:"customer",
    initialState:{
        customersDetails:[],
    },
    reducers:{
        setCustomers: (state,action) => {
            state.customersDetails = action.payload;
        },
    }
})

export const  { setCustomers } = customerSlice.actions;

export default customerSlice.reducer;