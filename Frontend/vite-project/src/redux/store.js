import authSlice from "./authslice.js";
import themeSlice from "./themeSlice.js";
import { configureStore} from "@reduxjs/toolkit";
const store =configureStore({
    reducer:{
    auth:authSlice,
    theme:themeSlice
    }
})
export default store