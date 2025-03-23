import { createSlice } from '@reduxjs/toolkit';

import { getMessage } from "../slices/actions";
const initialState = {
    message: null,
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
        }
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
            });
    },
});

export const {
    setMessage,
} = textUtilitySlice.actions;

export default textUtilitySlice.reducer;