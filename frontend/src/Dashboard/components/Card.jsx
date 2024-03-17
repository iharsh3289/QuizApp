import React from "react";
import image from "../../../images/ram.jpg";
import Load from "../components/Loading"
import { useEffect, useState } from "react";
import axios from "axios";
const Card = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData]=useState([])
    const [quizStatus, setquizStatus]=useState([])

    useEffect(() => {
      // Simulate loading time with setTimeout
        const token = localStorage.getItem('token');

        axios.post('http://127.0.0.1:8000/getUserData', {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token'.concat(' ',token),
                },
            })
            .then((response) => {
                console.log(response)
                setProfileData(response.data);

            }).catch((error)=>{
            console.log(error)
        })

        axios.post('http://127.0.0.1:8000/getStatistics', {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token'.concat(' ',token),
                },
            })
            .then((response) => {
                console.log(response)
                setquizStatus(response.data);

            }).catch((error)=>{
            console.log(error)
        })
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Simulate 3 seconds of loading time
  
      // Clean up the timeout
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
        {isLoading ? (
          <Load/>
        ) : (
   
      <div class="pt-2 md:ml-60 px-0">
        <div class=" flex gap-3 flex-col items-center pt-5 pl-5 pr-2 rounded-lg mt-14">
           
          <div class="w-full max-w-56 max-h-sm pt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={image}
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {profileData.name}
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {profileData.email}
              </span>
            </div>
          </div>







<div class="w-full w-lg relative border-gray-200 rounded-lg  overflow-x-auto mb-3" style={{height:"56.4vh",overflow:"scroll", scrollbarWidth:"none"}}>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

        <tr>
                <th scope="col" class="px-6 py-3">
                    Quiz name
                </th>
                <th scope="col" class="px-6 py-3">
                    Correct Answers
                </th>
                <th scope="col" class="px-6 py-3">
                    Wrong Answers
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody >
        {quizStatus.map((quiz)=> (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {quiz.quiz_title}
                </th>
                <td className="px-6 py-4">
                    {quiz.correct_questions}
                </td>
                <td className="px-6 py-4">
                    {quiz.wrong_questions}
                </td>
                <td className="px-6 py-4">
                    {quiz.status}
                </td>
            </tr>
        ))}


        </tbody>
    </table>
</div>

        </div>

      </div>

        )
        }
        </>
    );
};

export default Card;
