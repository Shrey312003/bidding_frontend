import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const State = {
    token: null,
    username: null,
}

const initalState = State;

const authSlice = createSlice({
    name:"auth",
    initialState: initalState,

    reducers:{
        setAuthTokens: (state,action)=>{
            state.token = action.payload.token;
        },

        setAccount: (state, action) => {
            state.username = action.payload;
        },

        logout: (state) => {
            state.account = null;
            state.refreshToken = null;
            state.token = null;
        },
    },
});

export default authSlice;