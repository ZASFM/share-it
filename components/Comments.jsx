import { useState, useEffect } from "react"
import { getComments } from "../services/index";
import moment from "moment";
import parse from 'html-react-parser';

const Comments=({slug})=>{
   const [comments,setComments]=useState([]);
 
   useEffect(()=>{
      getComments(slug)
         .then(result=>setComments(result));
   },[])

   return (
      <>
         {comments.length && (
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8 p-12"> 
               <h3 className="mb-8 font-semibold pb-4 border-b text-xl">
                  {comments.length}
                  {<span>' '</span>}
                  comments
               </h3>
               {comments.map(comment=>{
                  return (
                     <div key={comment.createAt} className="border-b border-gray-400 mb-4 pb-4">
                        <p className="mb-4">
                           <span className="font-semibold">{comment.name} </span>
                           <span>on </span>
                           {moment(comment.createAt).format('MMM DD, YYYY')}
                        </p>
                        <p className="wi-full text-gray-600 whitespace-pre-line">{parse(comment.comment)}</p>
                     </div>
                  )
               })}
            </div>
         )}
      </>
   )
}

export default Comments