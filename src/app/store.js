import { configureStore } from "@reduxjs/toolkit";

//import slices
import postsReducer from "../features/posts/postSlice";
import { combineReducers } from 'redux';

const reducer = combineReducers({
    // here we will be adding reducers
    posts: postsReducer,
})

export default configureStore({
    reducer
});
 