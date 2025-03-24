import { createSlice } from '@reduxjs/toolkit';
import {
    getMessage,
    convertToUpperCase,
    convertToLowerCase,
    checkPalindrome,
    subscribeToTimer,
    clearText
} from "../slices/actions";

const initialState = {
    message: null,
    text: "Enter text here.",
    timer: null,
    networkStatus: {
        loading: false,
        error: null,
    },
};

const textUtilitySlice = createSlice({
    name: 'textUtility',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload;
        },
        setText(state, action) {
            state.text = action.payload;
        },
        timerUpdated(state, action) {
            state.timer = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessage.pending, (state) => {
                state.networkStatus.loading = true;
                state.networkStatus.error = null;
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.networkStatus.loading = false;
                state.message = action.payload;
            })
            .addCase(getMessage.rejected, (state, action) => {
                state.networkStatus.loading = false;
                state.networkStatus.error = action.payload;
            })
            .addCase(convertToUpperCase.pending, (state) => {
                state.networkStatus.loading = true;
                state.networkStatus.error = null;
            })
            .addCase(convertToUpperCase.fulfilled, (state, action) => {
                state.networkStatus.loading = false;
                state.text = action.payload;
            })
            .addCase(convertToUpperCase.rejected, (state, action) => {
                state.networkStatus.loading = false;
                state.networkStatus.error = action.payload;
            })
            .addCase(convertToLowerCase.pending, (state) => {
                state.networkStatus.loading = true;
                state.networkStatus.error = null;
            })
            .addCase(convertToLowerCase.fulfilled, (state, action) => {
                state.networkStatus.loading = false;
                state.text = action.payload;
            })
            .addCase(convertToLowerCase.rejected, (state, action) => {
                state.networkStatus.loading = false;
                state.networkStatus.error = action.payload;
            })
            .addCase(clearText.pending, (state) => {
                state.networkStatus.loading = true;
                state.networkStatus.error = null;
            })
            .addCase(clearText.fulfilled, (state, action) => {
                state.networkStatus.loading = false;
                state.text = action.payload;
            })
            .addCase(clearText.rejected, (state, action) => {
                state.networkStatus.loading = false;
                state.networkStatus.error = action.payload;
            })
            .addCase(checkPalindrome.pending, (state) => {
                state.networkStatus.loading = true;
                state.networkStatus.error = null;
            })
            .addCase(checkPalindrome.fulfilled, (state, action) => {
                state.networkStatus.loading = false;
                state.text = action.payload;
            })
            .addCase(checkPalindrome.rejected, (state, action) => {
                state.networkStatus.loading = false;
                state.networkStatus.error = action.payload;
            });
    },
});

export const {
    setMessage,
    setText,
    timerUpdated
} = textUtilitySlice.actions;

export default textUtilitySlice.reducer;