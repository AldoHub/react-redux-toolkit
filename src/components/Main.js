
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

//state
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

//thunk
import { fetchAllPosts } from '../features/posts/postSlice';

const Main = () => {
  
    /**
     * 
     * If we just want to trigger the api call when we know a change has ocurred
     * we could use rxjs observable and update it as needed, with that, we would have a global way
     * to see if something changed or not, and use it inside the useeffect to trigger or not the api 
     * 
     */

    const dispatchAllPosts = useDispatch();
   
    useEffect(() => {
        //this will call the thunk and will make the fetch and populate of the state
        dispatchAllPosts(fetchAllPosts());
    }, [])

    const posts = useSelector(state => state.posts.posts);
   
    return (
        <Fragment>
           <div className='posts-container'>
              {posts.map(post => {
                return(
                    <div className='post' key={post.id}>
                        <Link to={"post/" + post.id}>
                            <div className="cover" style={{backgroundImage: "url(" + post.cover + ")" }}></div>
                        </Link>
                        <p>{post.name}</p>

                    </div>
                );
              })}
            </div>
        </Fragment>
    );
}

export default Main;