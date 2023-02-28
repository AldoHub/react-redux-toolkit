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
            const post = state.posts.find( post => post.id === action.payload);
            state.current = post;
        },
        updatePost: (state, action) => {
            console.log(action.payload)
            //set the current so we update the view right away
            state.current = action.payload;

            //look for the post on the state
            const post = state.posts.find(post => post.id == action.payload.id);
            
            //update the values on the array for the selected post
            if(post){
                post.cover = action.payload.cover;
                post.name = action.payload.name;
                post.content = action.payload.content;
            }

        },
        deletePost: (state, action) => {
            const post = state.posts.find( post => post.id === action.payload);
            
            //remove the post from the list of posts on the state
            if(post) {
             state.posts.splice(state.posts.indexOf(post), 1);
            }

            //set the current state for the post to null or empty
            state.current = "";

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            // Add posts to the state array and return it to use
            state.posts = action.payload; 
        })
       
    }
});


export const { addPost, getPost, updatePost, deletePost  } = postsSlice.actions;
export default postsSlice.reducer;