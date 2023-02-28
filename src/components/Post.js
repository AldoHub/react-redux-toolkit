
import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//state
import { useDispatch, useSelector } from 'react-redux';

import { getPost } from '../features/posts/postSlice';

const Post = () => {


    /**
     * 
     * NOTE -- there is no persistance of the data on refresh, so 
     * the option will be to call the data from the db on the event "beforeunload"
     * or save it to local storage and then reuse the data and set the state again
     * after the refresh
     * 
     */


    const [cover, setCover] = useState("");
    const {id} = useParams();
    const dispatchPostById = useDispatch();
    
    //we will need to check if the post is defined at the moment of the component mount
    const post = useSelector(state => state.posts.current);

    useEffect(() => {
        //this will call the thunk and will make the fetch and populate of the state
        dispatchPostById(getPost(id));
    }, [])


    const updatePost = async(e) => {
        e.preventDefault();
      
        const data = new FormData(e.target);
        let cover64 = "";

        if(cover != ""){
            cover64 = await imageToBase64(cover[0]);
        }else{
            cover64 = data.get("oldcover");
        }

        let updatedPost = {
            id: id,
            name: data.get('title'),
            content: data.get('content'),
            cover: cover64
        }
        
        //TODO -- handle the update of the post here
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

    
    return (
        <Fragment>
            {post && 
            <div>
            <div className='post-container' >
                <div className='left'>
                    <img src={post.cover} />
                </div>
                <div className='right'>
                    <h1>{post.name}</h1>
                    <div>
                        {post.content}
                    </div>
                </div>
               
                
            </div>


            <div className='update-form-container'>
            <form onSubmit={updatePost}>

                <label htmlFor="title">Post title:</label>
                <input type="text" name="title" id="title" defaultValue={post.name} required  />

                <label htmlFor="content">Post content: </label>
                <textarea name="content" id="content" defaultValue={post.content} required minLength="100"  ></textarea>

                <input type='hidden' name='oldcover' id='hidden' defaultValue={post.cover}  />

                <label htmlFor="cover" className="cover">Cover</label>
                <input type="file" id="cover"  onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="update post" />
           </form>
            </div>
            </div>
            }
        </Fragment>
    );
}

export default Post;