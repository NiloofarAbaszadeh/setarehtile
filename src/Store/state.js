import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    host: process.env.REACT_APP_BACKEND,
    commentToken: "3d6b04f082c5dbfcd6e45842e46ca4d31d652d7fe04ab23d84100727403ea2bc3132adcfe9178aa0d768847ee4dbd178c600ca7e3d6f64827bb72f09ba3426f545a48d17771ea5b2a0f487d47c2565407ae04395643ca05ff612d390359939d5ec5fa0d0e32ad482497bcbbff16963e17c956833cee559defbe32247dfee8d4d",
    readToken: "f0fd96f24f62d287647297500ea22249dc3007ae288894f631bb17ef7b66e487302ca3089af1dd20aa12bfdd3dd9e5f7f500730bb690b7ea6d60da7bd2a4bec0b50f12271115d287856faef6f058b7321f7e4090de9ce91c1e19ac1332543a48abe00a406b06cac02647e50ffdba4c7c5e1a7b1fcf96ffbbc22cd49a4462aaf4",
    sendToken : "3d6b04f082c5dbfcd6e45842e46ca4d31d652d7fe04ab23d84100727403ea2bc3132adcfe9178aa0d768847ee4dbd178c600ca7e3d6f64827bb72f09ba3426f545a48d17771ea5b2a0f487d47c2565407ae04395643ca05ff612d390359939d5ec5fa0d0e32ad482497bcbbff16963e17c956833cee559defbe32247dfee8d4d",
    userState: "logout",
    activeUser: {
      username: "",
      password: ""
    },

  },
  reducers: {
    // actions
    loginUser: (state, action) => {
      state.userState = "login"
      state.activeUser.username = action.payload;
      state.activeUser.password = 2;
    },
    logoutUser: (state) => {
      state.userState = "logout"
      state.activeUser.username = "";
      state.activeUser.password = "";
    }
  }
})

export const { loginUser, logoutUser} = stateSlice.actions

export default stateSlice.reducer;