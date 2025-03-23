import { configureStore } from "@reduxjs/toolkit";
import textUtilityReducer from "./slices/textUtilitySlice";

const store = configureStore({
    reducer: {
        textUtility: textUtilityReducer,
    },
});

export default store;
