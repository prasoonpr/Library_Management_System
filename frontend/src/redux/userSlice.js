import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userProfile:{
            user_id:null,
            name:null,
            email:null
        }
    },
    reducers:{
        setUser:(state,action)=>{
            const {_id,name,email}=action.payload;
            state.userProfile.user_id=_id
            state.userProfile.name=name,
            state.userProfile.email=email
        },
        clearUser:(state)=>{
            state.userProfile=null
        }
    }
})

export const{setUser,clearUser}=userSlice.actions
export default userSlice.reducer