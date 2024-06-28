import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/api/users/'

export const getAllUsers = createAsyncThunk('getUser', async (endpoint) => {
    const res = await axios.get(`${baseUrl}${endpoint}`)
    return res.data
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        error: null,
        loading: false,
        allUsers: []
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, actions) => {
            state.currentUser = actions.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure: (state, actions) => {
            state.loading = false;
            state.error = actions.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, actions) => {
            state.currentUser = actions.payload;
            state.error = null;
            state.loading = false;
        },
        updateFailure: (state, actions) => {
            state.loading = false;
            state.error = actions.payload;
        },
        deleteStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteFailure: (state, actions) => {
            state.loading = false;
            state.error = actions.payload;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, actions) => {
                state.loading = false;
                state.allUsers = actions.payload;
            })
            .addCase(getAllUsers.rejected, (state, actions) => {
                state.loading = false;
                state.error = actions.payload;
            })
    }
});

export const {
    signInFailure,
    signInStart,
    signInSuccess,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteFailure,
    deleteStart,
    deleteSuccess,
    signOutSuccess
} = userSlice.actions;
export default userSlice.reducer;