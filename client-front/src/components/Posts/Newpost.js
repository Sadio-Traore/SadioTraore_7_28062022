import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";



const NewPost = () => {

    const posterId = useParams().id;
  const [message, setMessage] = useState();

  
   const handlePost = (e) => {
    e.preventDefault();

    
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        posterId,
        message,
      },
    })
      .then((res) =>{
        console.log(res);
        console.log('res')
        if(res.data.errors){
console.log(res.data.errors)       
        } else {
          console.log('ok')
         console.log(message)
          
        }
     }  )
    
      .catch((err) => {
        console.log('err')
        console.log(err);
      });
  };



    return (

        <form action ="" onSubmit={handlePost} id = "Post">
        <label htmlFor = "newPost">Rédiger un nouveau post</label>
        <br />
        <textarea cols="45" rows="5" className ='textArea'
          value={message}
          onChange={(e) => setMessage(e.target.value)} />
        <br />
        <input type="submit" value="Valider" />Valider
      </form> 
      
    )
};
 export default NewPost;