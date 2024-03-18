import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mdiCubeOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import image from "../../../images/ram.jpg";
import axios from "axios";
const top = ({setsearch}) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [profileData, setProfileData]=useState([])

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

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3 seconds of loading time

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, []);

  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }
  function handleToggle(){
    const sidebar=document.getElementById("logo-sidebar");
    if (sidebar.style.transform === 'translateX(-300px)') {
      sidebar.style.transform = 'translateX(0)';
    } else {
      sidebar.style.transform = 'translateX(-300px)';
    }
  }
  return (
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
   
    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{height:"11vh"}}>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start ">
          <button
          onClick={handleToggle}
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="#" class="flex ms-2 md:me-24">
            <Icon
              path={mdiCubeOutline}
              size={1.6}
              className="cube"
              class=" dark:text-white"
            />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              InstaQuiz
            </span>
          </a>
        </div>
        <div class="flex items-center md:w-56 lg:w-96 ">
          <form class="max-w-md mx-auto w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
              onChange={(e)=>{setsearch(e.target.value)}}
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Global Quizzes"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div class="flex items-center">
          <div></div>
          <div style={{cursor:"pointer"}}className="flex" onClick={handleClick} class="mr-5">
          <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
            <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
          <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
            <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
        
      </div>
          <div>
            <button
            onClick={()=>{navigate('/dashboard/profile')}}
              type="button"
              class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <div class="relative flex items-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img
                    className="h-12 w-auto w-24 mb-3 rounded-full shadow-lg"
                    src={"data:image/png;base64," + profileData.image}
                    alt="Bonnie image"
                />
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
    </nav>
  )
}

export default top