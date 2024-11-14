import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState:InitialStateTypes ={
  isSidebarCollapsed: false,
  isDarkMode:false
}
export const appSlice = createSlice({
  name:'global',
  initialState,
  reducers:{
    setIsSidebarcollapsed :(state,action:PayloadAction<boolean>)=>{
     state.isSidebarCollapsed = action.payload
    },
    setIsDarkMode:(state,action:PayloadAction<boolean>)=>{
      state.isDarkMode= action.payload
    }
  }
})
export const { setIsSidebarcollapsed, setIsDarkMode} = appSlice.actions;
export default appSlice.reducer