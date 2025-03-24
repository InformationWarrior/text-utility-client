import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../GraphQL/Apollo/client";
import { GET_MESSAGE } from "../../GraphQL/Operations/queries";
import {
    CONVERT_TO_UPPERCASE,
    CONVERT_TO_LOWERCASE,
    CLEAR_TEXT
} from "../../GraphQL/Operations/mutations";

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