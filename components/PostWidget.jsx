import { useState, useEffect, use } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getSimilarPosts } from "@/services";

const PostWidget=({categories,slug})=>{
   const [relatedPosts,setRelatedPosts]=useState([]);

   useEffect(()=>{
     if(slug){
       getSimilarPosts(categories,slug)
         .then(results=>setRelatedPosts(results));
     }else{
       getRecentPosts()
         .then(results=>setRelatedPosts(results));
     }
   },[slug]);
   
   return (
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
         <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {slug?'Related posts':'Recent posts'}
         </h3>
         {relatedPosts.map(post=>(
            <div key={post.title} className="flex items-center mb-4 w-full">
              <div className="w-16 flex-none">
                 <img
                    alt="author"
                    height="60px"
                    width="60px"
                    className="align-middle rounded-full"
                    src={post.featuredImage.url}
                 />
              </div>
              <div className="flex-grow ml-4">
                 <p>
                    {moment(post.createdAt).format('MMM DD, YYYY')}
                 </p>
                 <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                    {post.title}
                 </Link>
              </div>
            </div>
         ))}
      </div>
   )
}

export default PostWidget;