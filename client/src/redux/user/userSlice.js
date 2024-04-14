import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    error: null,
    loading: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
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
        }
    }
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
export default userSlice.reducer;