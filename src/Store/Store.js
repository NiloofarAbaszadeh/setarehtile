import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./state";

export default configureStore({
  reducer: {
    State: stateSlice,
  }
})