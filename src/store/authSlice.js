import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const State = {
    token: null,
    username: null,
    isAuthenticated: false,
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
            state.isAuthenticated = true;
        },

        logout: (state) => {
            
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
              
        },
    },
});

export default authSlice;