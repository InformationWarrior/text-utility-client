import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../GraphQL/Apollo/client";
import { timerUpdated } from "./textUtilitySlice";
import { formatTime } from "../../Utils/formatTime";
import { GET_MESSAGE } from "../../GraphQL/Operations/queries";
import {
    CONVERT_TO_UPPERCASE,
    CONVERT_TO_LOWERCASE,
    CHECK_PALINDROME,
    CLEAR_TEXT
} from "../../GraphQL/Operations/mutations";
import { TIMER_SUBSCRIPTION } from "../../GraphQL/Operations/subscriptions";

export const getMessage = createAsyncThunk(
    "textUtility/getMessage",
    async (_, { rejectWithValue }) => {
        try {
            const response = await client.query({
                query: GET_MESSAGE,
                fetchPolicy: "network-only",
            });

            if (!response.data || !response.data.getMessage) {
                throw new Error("Invalid response structure");
            }
            return response.data.getMessage;
        }
        catch (error) {
            console.error("Error fetching message:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const subscribeToTimer = () => (dispatch) => {
    const observable = client.subscribe({
        query: TIMER_SUBSCRIPTION,
    });

    observable.subscribe({
        next({ data }) {
            if (data?.timerRunning) {
                const formattedTime = formatTime(data.timerRunning.timeRemaining);
                dispatch(timerUpdated(formattedTime));
            }
        },
        error(error) {
            console.error("Subscription error:", error);
        },
    });
};


export const convertToUpperCase = createAsyncThunk(
    "textUtility/convertToUpperCase",
    async ({ text }, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: CONVERT_TO_UPPERCASE,
                variables: { text },
            })

            if (!response.data || !response.data.convertToUpperCase) {
                throw new Error("Invalid response from convertToUpperCase mutation");
            }

            console.log("Response received:", response.data.convertToUpperCase);
            return response.data.convertToUpperCase.text;
        } catch (error) {
            console.error("convertToUpperCase error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const convertToLowerCase = createAsyncThunk(
    "textUtility/convertToLowerCase",
    async ({ text }, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: CONVERT_TO_LOWERCASE,
                variables: { text },
            })

            if (!response.data || !response.data.convertToLowerCase) {
                throw new Error("Invalid response from convertToLowerCase mutation");
            }

            console.log("Response received:", response.data.convertToLowerCase);
            return response.data.convertToLowerCase.text;
        } catch (error) {
            console.error("convertToLowerCase error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const checkPalindrome = createAsyncThunk(
    "textUtility/checkPalindrome",
    async ({ text }, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: CHECK_PALINDROME,
                variables: { text },
            })

            if (!response.data || !response.data.checkPalindrome) {
                throw new Error("Invalid response from checkPalindrome mutation");
            }

            console.log("Response received:", response.data.checkPalindrome);
            return response.data.checkPalindrome.text;
        } catch (error) {
            console.error("checkPalindrome error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const clearText = createAsyncThunk(
    "textUtility/clearText",
    async (_, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: CLEAR_TEXT,
            })

            if (!response.data || !response.data.clearText) {
                throw new Error("Invalid response from clearText mutation");
            }

            console.log("Response received:", response.data.clearText);
            return response.data.clearText.text;
        } catch (error) {
            console.error("clearText error:", error);
            return rejectWithValue(error.message);
        }
    }
);