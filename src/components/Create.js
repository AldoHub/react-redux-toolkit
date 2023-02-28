
import React, { Fragment, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//service
import { postsService } from '../services/postsService';

//state
import { useDispatch } from 'react-redux';

//state reducers
import { addPost } from '../features/posts/postSlice';


const Create = () => {

    const [cover, setCover] = useState("");
    const [isBusy, setIsBusy] = useState(false);    

    //state action trigger
    const dispatchAddPost = useDispatch();    


    const _addPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        const data = new FormData(e.target);
        let cover64 = "";

       //make the cover into base64
       cover64 = await imageToBase64(cover[0]);

       let post = {
           id: uuidv4(),
           name: data.get('title'),
           content: data.get('content'),
           cover: cover64,
         
       }

       //cannot add this on the reducer itself, since it will complain
       //so after the data is set to the server we push it to the store/state
       const created = await postsService.createPost(post).catch(err => console.log(err));
       if(created){
        //here we push to the state
        dispatchAddPost(addPost(post));
       }else{   
        alert("There as a problem adding the data")
       } 

       
    }
    
    //converts the images into base64 for easy storage on json
    const imageToBase64 = async(element) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result)
            }
            reader.onerror = reject;
            reader.readAsDataURL(element);
           
        })
        
    }



    let createForm;
    if(isBusy){
        createForm = (
            <div className="loaderContainer">
                <p>Request is being processed</p>
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> 

        )
    }else{
        createForm = (
           <form onSubmit={_addPost}>
               <p>Create the new post</p>

                <label htmlFor="title">Post title:</label>
                <input type="text" name="title" id="title" required  />

                <label htmlFor="content">Post content: </label>
                <textarea name="content" id="content" required minLength="100"  ></textarea>


                <label htmlFor="cover" className="cover">Cover</label>
                <input type="file" id="cover" required onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="create post" />
           </form>
       ) 
    }

    return (
        <>
          {createForm}
        </>
    );
}

export default Create;