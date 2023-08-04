import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { loadingSlice } from "./features/loadingSlice";
import { blurSlice } from "./features/blurSlice";
import { inventorySlice } from "./features/inventorySlice";
import { customerSlice } from "./features/customerSlice";
import { salesSlice } from "./features/salesSlice";




const persistConfig = {
    key:"root",
    version:1,
    storage
};


const reducer = combineReducers({
    user:userSlice.reducer,
    loading:loadingSlice.reducer,
    blur:blurSlice.reducer,
    inventory:inventorySlice.reducer,
    customer:customerSlice.reducer,
    sales:salesSlice.reducer,

})



const persistedReducer = persistReducer(persistConfig,reducer);

export default configureStore({
    reducer:persistedReducer
});