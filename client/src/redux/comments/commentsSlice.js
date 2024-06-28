import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = '/api/comments/'

export const getAllComments = createAsyncThunk('comments', async (endpoint) => {
    const res = await axios.get(`${baseUrl}${endpoint}`)
    return res.data
})

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        status: "idle",
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comments = action.payload;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})
export default commentsSlice.reducer


