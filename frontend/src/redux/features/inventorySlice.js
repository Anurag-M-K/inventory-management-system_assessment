import { createSlice } from "@reduxjs/toolkit";


export const inventorySlice = createSlice({
    name:"inventory",
    initialState:{
        inventoryDetails:[],
    },
    reducers:{
        setInventoryDetails: (state,action) => {
            console.log("sfsdfasdfasdf ",action.payload)
            state.inventoryDetails = action.payload;
        },
    }
})

export const  { setInventoryDetails } = inventorySlice.actions;

export default inventorySlice.reducer;