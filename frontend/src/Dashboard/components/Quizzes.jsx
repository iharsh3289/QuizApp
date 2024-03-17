import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Load from "../components/Loading"
import axios from "axios";
import Userleave from "./modals/userleave.jsx";
const Quizzes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  const[ joined_group,setjoinedgroup]=useState([]);
  const [modal, setmodal] = useState();
  const [close, setclose] = useState(false);
  useEffect(() => {
    // Simulate loading time with setTimeout
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/joined_groups', {
      withCredentials : true ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
        .then((response) => {
          setjoinedgroup(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3 seconds of loading time

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, []);
  const handleCreateGroup = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/dashboard/creategroup');
  };
  const handleleavepopup = (a, group_name, group_privacy) => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/get_quiz', {group_id:a },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},},)
        .then((response) => {
          setmodal(<Userleave quizdata={response.data} group_id={a} group_name={group_name} group_privacy={group_privacy} setclose={setclose} />);

          setclose(true);
        })
        .catch((error) => {
          console.log(error);
        });



  };
  return (
    <>
    {isLoading ? (
      <Load/>
    ) : (
    <div class="pt-2 md:ml-60 px-0">
    <div class="pt-5 pl-5 pr-2 rounded-lg mt-14">
    <div>
    <div
      class=" flex justify-between items-center pt-5 pl-12 bg-gray-50 dark:bg-gray-800"
      style={{
        width: "100%",
        textAlign: "center",
        fontSize: "2rem",
      }}
    >
      <div class='dark:text-white'>Joined Groups</div>
      <div>
        <button
        onClick={handleCreateGroup}
          type="button"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Group
        </button>
      </div>
    </div>
    <div
      style={{
        scrollbarWidth: "none",
        overflow: "scroll",
        height: "77.5vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
      class="pt-5 pl-12 bg-gray-50 dark:bg-gray-800"
    >
      {close && modal}
      {joined_group?.map((group) => (
      <div
          key={group.group_id}
        style={{ width: "70%" }}
        class="w-full mb-5 max-h-40 max-w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex flex-col items-center px-1 py-2">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center ">

            {group.group_name}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {group.group_privacy}
          </span>

          <div class="flex mt-4 md:mt-6">
            <a
                onClick={()=>{handleleavepopup(group.group_id, group.group_name, group.group_privacy)}}
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Group
            </a>
          </div>
        </div>
      </div> ))}

      
    </div>
  </div>
  </div>
  </div>)}</>
  )
}

export default Quizzes