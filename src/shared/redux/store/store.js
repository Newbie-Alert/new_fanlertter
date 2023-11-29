import { configureStore } from "@reduxjs/toolkit";
import messages from "../modules/messages";

const store = configureStore({
  reducer: {
    messages,
  }
})


export default store