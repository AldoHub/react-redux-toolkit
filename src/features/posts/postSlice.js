import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsService } from "../../services/postsService";


export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
    async () => {
     // here is your receiving remarks function
     const data = await postsService.getPosts().catch(err => console.log(err));
     return data;

});


export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        "posts": [],
        "current": null
    },
    reducers: {
        //---- add reducers
       
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        getPost: (state, action) => {
            console.log("TRIGGER")
            const post = state.posts.find( post => post.id === action.payload);
            state.current = post;
        },
        deletePost: (state, action) => {
            const post = state.posts.find( post => post.id === action.payload);
            if(post) {
             state.posts.splice(state.posts.indexOf(post), 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            // Add posts to the state array and return it to use
            state.posts = action.payload; 
        })
       
    }
});


export const { addPost, getPost, deletePost  } = postsSlice.actions;
export default postsSlice.reducer;