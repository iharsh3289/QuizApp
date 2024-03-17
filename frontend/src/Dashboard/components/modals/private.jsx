import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const user = ({setclose, quizdata, group_id, group_name, group_privacy}) => {
    const navigate = useNavigate();
    function handleClose(){
      window.location.reload();
      setclose(false);
    }
    function handleRequest(a){
      const token = localStorage.getItem('token');

      axios.post('http://127.0.0.1:8000/send_invite', {"group_id":a},
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token'.concat(' ',token),
          },
        })
        .then((response) => {

            console.log("succesfully joined group")

        }).catch((error)=>{
            console.log(error)
        })
      const created = document.getElementById('request');
      created.textContent = 'Request is send successfully';
      const timeout = setTimeout(() => {
          created.textContent = '';
        handleClose()
        }, 500);
       
  }
  function handleSelectQuiz(){
    const created = document.getElementById('request');
    created.style.color='red';
    created.textContent = 'You are not member of this group';
      const timeout = setTimeout(() => {
          created.textContent = '';
        }, 1000);
  }
  return (

    <div
    style={{ width: "100%",
        height: "100%",backgroundColor:"rgba(0, 0, 0, 0.5)"}}
      id="user-modal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed md:pl-60 pt-36 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-3xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
             {group_name}
            </h3>
            <button
            onClick={handleClose}
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="flex justify-around p-2">
            <div class="md:p-5 space-y-4">
              <p>Total Quizzes: {quizdata.quiz_count}</p>
              <p>Total Members:{quizdata.member_count}</p>
              <div class="flex gap-3 flex-col">
                <button
                onClick={()=>handleRequest(group_id)}
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send Request
                </button>
                <p id="request" class="block mb-2 text-sm font-medium text-blue-500"></p>
              </div>
            </div>
            <div style={{ scrollbarWidth: "none", height:"30vh", width:"100%", overflowY: "auto"}} class="flex gap-2 items-center p-4 md:p-5 " >

          {quizdata.quiz_details?.map((quiz)=>(
            <a key={quiz.quiz_id} onClick={()=>{handleSelectQuiz}} href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz.quiz_title}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{quiz.quiz_desc}</p>
          </a>
          ))}
         
          
          
          
          
                    </div>
         

          </div>

         
        </div>
      </div>
    </div>
   
  );
};

export default user;
