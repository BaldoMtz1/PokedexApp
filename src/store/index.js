import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";

//Estados globales
export default configureStore({
  reducer:{

    nameTrainer

  }
})