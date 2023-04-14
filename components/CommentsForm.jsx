import { useState, useEffect, useRef } from "react"
import {submitComment} from '../services/index';

const CommentsForm = ({ slug }) => {
   const [error, setError] = useState(null);
   const [localStorage, setLocalStorage] = useState(null);
   const [ShowSuccessMessage, setShowSuccessMessage] = useState(null);
   const commentEl = useRef();
   const nameEl = useRef();
   const emailEl = useRef();
   const storeDataEl = useRef();

   useEffect(()=>{
      nameEl.current.value=window.localStorage.getItem('name');
      emailEl.current.value=window.localStorage.getItem('email');
   },[])


   const handleSubmit = (e) => {
      e.preventDefault();
      setError(false);
      const { value: name } = nameEl.current;
      const { value: email } = emailEl.current;
      const { value: comment } = commentEl.current;
      const { checked: storeData } = storeDataEl.current;

      if (!name || !email || comment) {
         setError(true);
         return;
      }

      const commObj = { name, email, comment, slug };

      if(storeData){
         window.localStorage.setItem('name',name);
         window.localStorage.setItem('email',email);
      }else{
         window.localStorage.removeItem('name',name);
         window.localStorage.removeItem('email',email);
      }

      submitComment(commObj)
         .then(result=>{
            setShowSuccessMessage(true);
            setTimeout(()=>{
               setShowSuccessMessage(false);
            },3000)
         })

   }

   const onInputChange=()=>{

   }

   return (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
         <h3 className="text-xl mb-8 font-semibold border-b pb-4">Send a comment</h3>
         <div className="grid grid-cols-1 gap-4 mb-4">
            <textarea
               ref={commentEl}
               className="p-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Insert Comment"
               name="comment"
            />
         </div>
         <div className="grid grid-cols-1 gap-4 mb-4">
            <input
               type="text"
               className="py-2 px-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Insert Name"
               name="name"
               ref={nameEl}
            />
            <input
               type="text"
               className="py-2 px-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Insert Email"
               name="email"
               ref={emailEl}
            />
         </div>
         <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
               <input checked={storeDataEl} ref={storeDataEl} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
               <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
            </div>
         </div>
         {error && <p className="text-xs text-red-500">{error}</p>}
         <div className="mt-8">
            <button
               type="button"
               className="transition duration-500 ease hover:bg-indigo-500 inline-block bg-pink-500 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
               onClick={handleSubmit}
            >
               Submit
            </button>
            {ShowSuccessMessage && <span className="text-xl font-semibold float-right text-green-500 mt-3">Comment sent succesfully</span>}
         </div>
      </div>
   )
}

export default CommentsForm