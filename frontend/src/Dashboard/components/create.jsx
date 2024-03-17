import React from 'react'
import { useEffect, useState } from "react";
import Load from "../components/Loading"
import  axios from "axios";
import {useNavigate} from "react-router-dom";
const create = () => {
  const [isLoading, setIsLoading] = useState(true);
const navigate=useNavigate();
  useEffect(() => {
    // Simulate loading time with setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3 seconds of loading time

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, []);
    const [privacy, setprivacy]=useState("Public");
    const [showMessage, setShowMessage] = useState(false);
    function handlePrivacy(a){
      const paragraph = document.getElementById('privacy');
      if(a=="Public"){
          setprivacy(a);
          paragraph.textContent = 'Group is public';

          const timeout = setTimeout(() => {
              paragraph.textContent = '';
            }, 10000);
      }
      else{
          setprivacy(a);
          paragraph.textContent = 'Group is private';
          const timeout = setTimeout(() => {

              paragraph.textContent = '';
            }, 10000);
      }

    }
    function handleCreate(e){
      e.preventDefault();
      var data={
          group_name:e.target[0].value,
          group_desc:e.target[1].value,
          group_privacy: privacy,
      } ;
      console.log(data)
      // {'group_privacy':" ","group_title":" ","group_desc":" "}
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:8000/create_group', data,{
  headers: {
    'Authorization': 'Token'.concat(' ',token),
    'Content-Type': 'application/json',
  },
})
.then((response) => {
  console.log(response)
    navigate('/')

})
.catch((error) => {
  console.log(error);
});

        const created = document.getElementById('created');
        created.textContent = 'Group is created successfully';
        const timeout = setTimeout(() => {
            created.textContent = '';
          }, 10000);        
    }
    
  return (
    <>
    {isLoading ? (
      <Load/>
    ) : (
   <div style={{width:"100vw", height:"100vh", paddingTop:"5rem"}} class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"> 
       <div class="pt-2 md:ml-60 px-0">
        <div class="pt-5 pl-5 pr-2 rounded-lg mt-14"></div>
<form onSubmit={handleCreate} class="max-w-sm mx-auto">
  
  <div class="mb-5">
      <label for="base-input" class="block mb-2 text-3xl font-large text-gray-900 dark:text-white">Group Name</label>
      <input maxLength={10} style={{width:"40vw"}} required  type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
  <div class="mb-5">
      <label for="large-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Group Description</label>
      <input maxLength={14} style={{width:"40vw"}} required  type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
  <button onClick={()=>{handlePrivacy("Public")}} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Public</button>
  <button onClick={()=>{handlePrivacy("Private")}} type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Private</button>
  <p id="privacy" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default public</p>
  <button  type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Group</button>
  <p id="created" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></p>
</form>
</div>

</div>)}</>

  )
}

export default create