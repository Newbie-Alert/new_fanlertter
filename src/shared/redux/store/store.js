import { configureStore } from "@reduxjs/toolkit";
import messages from "../modules/messages";
import auth from "../modules/auth";

const store = configureStore({
  reducer: {
    messages,
    auth,
  }
})


export default store