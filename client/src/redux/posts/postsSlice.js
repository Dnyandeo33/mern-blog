import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = '/api/posts/'

export const getAllPosts = createAsyncThunk('getPosts', async (endpoint) => {
    const res = await axios.get(`${baseUrl}${endpoint}`);
    return res.data;
})

export const getPostBySlug = createAsyncThunk('getPostBySlug', async (slug) => {
    const res = await axios.get(`${baseUrl}${slug}`);
    return res.data;
})

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        slugPosts: [],
        loading: false,
        error: null,
    },

    reducers: {
        addPost(state, action) {
            state.posts.push(action.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        updatePost(state, action) {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // by slug
            .addCase(getPostBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.slugPosts = action.payload;
            })
            .addCase(getPostBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});
export const {
    addPost,
    deletePost,
    updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;





