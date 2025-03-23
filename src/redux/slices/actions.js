import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../GraphQL/Apollo/client";
import { GET_MESSAGE } from "../../GraphQL/Operations/queries";

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