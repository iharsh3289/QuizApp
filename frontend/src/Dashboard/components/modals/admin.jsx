import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Create  from "./create/create.jsx" ;
const admin = ({setclose, quizdata, group_id, group_name, group_privacy}) => {
  const navigate = useNavigate();
  const [members, setmembers]=useState([]);
  const [invites, setinvites]=useState([]);
const [quiz_data, setquizdata]=useState(quizdata);


    function handleInvites(a){
      const token = localStorage.getItem('token');

      axios.post('http://127.0.0.1:8000/get_all_invite', {"group_id":a},
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token'.concat(' ',token),
          },
        })
        .then((response) => {
            console.log(response);

            setinvites(response.data);

        }).catch((error)=>{
            console.log(error)
        })
        const element=document.getElementById("InviteDropDown");
        if(element.style.display==="block"){
            element.style.display="none"
        }
        else{
           element.style.display="block"; 
        }        
      
    }
    function handleMembers(a){

      const token = localStorage.getItem('token');

      axios.post('http://127.0.0.1:8000/participants', {"group_id":a},
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token'.concat(' ',token),
          },
        })
        .then((response) => {
          setmembers(response.data);

        }).catch((error)=>{
            console.log(error)
        })
        const element=document.getElementById("Membersdropdown");
        if(element.style.display==="block"){
            element.style.display="none"
        }
        else{
           element.style.display="block"; 
        }        
       
    }
    function handleClose(){
        window.location.reload();
      setclose(false);
    }
    function deleteGroup(group_id){
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:8000/delete_group', {"group_id":group_id},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
          console.log(response)
          console.log("succesfully joined group")
          handleClose();
          navigate('/')

      }).catch((error)=>{
          console.log(error)
      })

    }
    function deleteMember(group_id, user_id){
      
      var token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/reject_invite', {"group_id":group_id,"member_id":user_id},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
          console.log(response)
          console.log("succesfully leaved or delete invite group")
          token = localStorage.getItem('token');

          axios.post('http://127.0.0.1:8000/participants', {"group_id":group_id},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Token'.concat(' ',token),
                  },
              })
              .then((response) => {
                  setmembers(response.data);

              }).catch((error)=>{
              console.log(error)
          })

      }).catch((error)=>{
          console.log(error)
      })


    }
    function showProfile(){
      
    }
    function acceptInvite(member_id, group_id){
      
      var token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/accept_invite', {"group_id":group_id,"member_id":member_id},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
          console.log(response)
          console.log("succesfully joined group")
          token = localStorage.getItem('token');

          axios.post('http://127.0.0.1:8000/get_all_invite', {"group_id":group_id},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Token'.concat(' ',token),
                  },
              })
              .then((response) => {
                  console.log(response);

                  setinvites(response.data);

              }).catch((error)=>{
              setinvites([]);
              console.log(error)
          })

      }).catch((error)=>{
          console.log(error)
      })

    }
    function rejectInvite(member_id, group_id){
      
      var token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/reject_invite', {"group_id":group_id,"member_id":member_id},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
          console.log(response)
          console.log("succesfully leaved or delete invite group")
          token = localStorage.getItem('token');

          axios.post('http://127.0.0.1:8000/get_all_invite', {"group_id":group_id},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Token'.concat(' ',token),
                  },
              })
              .then((response) => {
                  console.log(response);

                  setinvites(response.data);

              }).catch((error)=>{
              setinvites([]);
              console.log(error)
          })

      }).catch((error)=>{
          console.log(error)
      })

    }
    function removeQuiz(quiz_id){
      var token = localStorage.getItem('token');
      
      axios.post('http://127.0.0.1:8000/delete_quiz', {"group_id":group_id,"quiz_id":quiz_id},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
          console.log(response)
          console.log("succesfully delete quiz")
          token = localStorage.getItem('token');
          axios.post('http://127.0.0.1:8000/get_quiz', {group_id:group_id },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},},)
              .then((response) => {
                  setquizdata(response.data)


              })
              .catch((error) => {
                  console.log(error);
              });

      }).catch((error)=>{
          console.log(error)
      })

    }
    function playQuiz(quiz_id){
      //here quiz will be played but the result will update on the final scoreboard
      setclose(false); 
    }
    // const [nothing, setnothing]=useState(false);
    // const temp=<Create group={group_id} setnothing={setnothing}/>
    function CreateQuiz(){
        // setnothing(true);
         // setclose(false);
        navigate('/dashboard/createquiz', {state:{groupID: group_id}});

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
        {/*{nothing && temp}*/}
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
              <div class="flex gap-3">
                <button
                onClick={CreateQuiz}
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Quiz
                </button>
                <button
                onClick={()=>{deleteGroup(group_id)}}
                  type="button"
                  class="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete Group
                </button>
              </div>
            </div>
            <div class="mr-2">
              <button
              onClick={()=>{handleMembers(group_id)}}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Group Members{" "}
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="Membersdropdown"  style={{scrollbarWidth:"none"}} 
                class="z-10 hidden  overflow-scroll h-28 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {members?.map((member)=>(
                    <li class="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <a
                    onClick={showProfile(member.user_id)}
                      href="#"
                      class="block px-4 py-2 "
                    >
                      {member.name}
                    </a>
                    <a href="#" class="px-2 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg onClick={()=>{deleteMember(member.group_id, member.user_id)}} class="h-6 w-6 text-red-500 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </a>
                  </li>
                  ))}
                  
                  
                </ul>
              </div>
            </div>
         <div>   
<button onClick={()=>{handleInvites(group_id)}} id="InviteButton" data-dropdown-toggle="dropdownBgHover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Group Invitations <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>


<div id="InviteDropDown" style={{scrollbarWidth:"none"}} class="z-10 hidden overflow-scroll h-28 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
      {invites?.map((invite)=>(

        <li key={invite.member_id}>
        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input onClick={()=>{acceptInvite(invite.member_id, group_id)}} style={{cursor:"pointer"}} id="checkbox-item-4" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
          <label onClick={showProfile(invite.member_id)} style={{cursor:"pointer"}} for="checkbox-item-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{invite.name}</label>
          <a onClick={()=>{rejectInvite(invite.member_id, group_id)}} href="#" class="px-1 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg class="h-6 w-6 text-red-500 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
           </a>
        </div>
      </li>
      ))}
      
      
    </ul>
</div>
        </div>

          </div>

          <div style={{ scrollbarWidth: "none", height:"30vh", width:"100%", overflowY: "auto"}} class="flex gap-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" >

              {quiz_data.quiz_details?.map((quiz) => (
<a href="#" class="block  max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<a href="#" class=" dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg onClick={()=>{removeQuiz(quiz.quiz_id)}} class="ml-14 h-6 w-6 text-red-500 z-100"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </a>
<h5 onClick={()=>{playQuiz(quiz.quiz_id)}}  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz.quiz_title}</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{quiz.quiz_desc}</p>
</a>

              ))}

          </div>
        </div>
      </div>
    </div>
   
  );
};

export default admin;
