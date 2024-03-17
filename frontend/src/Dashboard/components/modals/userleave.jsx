import React from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../../../game/components/Home';
import axios from "axios";
const userleave = ({setclose, quizdata, group_id, group_name, group_privacy}) => {
  const navigate = useNavigate();
  function handleClose(){
    setclose(false);
  }
    function handleLeave(a){
      const token = localStorage.getItem('token');


      axios.post('http://127.0.0.1:8000/leave_group', {"group_id":a},
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token'.concat(' ',token),

          },
        })
        .then((response) => {
          window.location.reload();
            console.log("succesfully leaved group")

        }).catch((error)=>{
            console.log(error)
        })

      const created = document.getElementById('leave');
      created.textContent = 'Group is leaved successfully';
      const timeout = setTimeout(() => {
          created.textContent = '';
          setclose(false); 
        }, 500);        
  }
  function handleSelectQuiz(quiz_id){
    
        const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/get_quiz_data', {headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},params:{quiz_id:quiz_id }})
  .then((response) => {
    const ques_data=response.data;






    navigate('/play', {state:{quesDATA2:ques_data,
      quiz_id:quiz_id}})
  })
  .catch((error) => {
    console.log(error);
  });
    setclose(false); 
  }
  
  return (

    <div
    style={{width: "100%",
        height: "100%",backgroundColor:"rgba(0, 0, 0, 0.5)"}}
      id="admin-modal"
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
              <p>Total Members: {quizdata.member_count}</p>
              <div class="flex gap-3 flex-col">
                <button
                onClick={()=>{handleLeave(group_id)}}
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Leave Group
                </button>
                <p id="leave" class="block mb-2 text-sm font-medium text-red-500"></p>
              </div>
            </div>
            <div style={{ scrollbarWidth: "none", height:"30vh", width:"100%", overflowY: "auto"}} class="flex gap-2 items-center p-4 md:p-5 " >
            {quizdata.quiz_details?.map((quiz) => {
              return(
          <a onClick={()=>{handleSelectQuiz(quiz.quiz_id)}} href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz.quiz_title}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{quiz.quiz_desc}</p>
          </a>)
          })}
          
              
          
          
          
          
          
                    </div>
         

          </div>

         
        </div>
      </div>
    </div>
 
  )
}

export default userleave