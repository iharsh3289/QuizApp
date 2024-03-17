import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const sidebar = () => {
  const navigate = useNavigate();
  
  function handleNavigate(a) {
    if (a === "dashboard") {
      navigate('/');
    }
    else if(a==="create"){
      navigate('/dashboard/creategroup');
    }
    else if (a === "groups") {
      navigate('/dashboard/groups');
    }
    else if(a==="signout"){
      const token = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/accounts/logout', {
   withCredentials : true ,
   headers: {
     'Authorization': `Token ${token}`,
     'Content-Type': 'application/json',
   },
 })
 .then((response) => {
       console.log(response.data)
       localStorage.removeItem('token');
       localStorage.removeItem('isLoggedIn');


 })
 .catch((error) => {
   console.log(error);
 });

      navigate('/login');
    }
    else if(a==="profile"){
      navigate('/dashboard/profile');
    }
  }
  return (
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pt-2 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li onClick={() => handleNavigate("dashboard")}>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>

              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          <li onClick={() => handleNavigate("create")}>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  fill-rule="evenodd"
                  d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ms-3">Create</span>
            </a>
          </li>


          <li onClick={() => handleNavigate("groups")}>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  fill-rule="evenodd"
                  d="m5.5 7.7 1-2.7h11A56 56 0 0 1 19 9.7v.6l-.3.4a1 1 0 0 1-.4.2.8.8 0 0 1-.6 0 1 1 0 0 1-.4-.2l-.2-.4-.1-.6a1 1 0 1 0-2 0c0 .4-.1.7-.3 1a1 1 0 0 1-.7.3.9.9 0 0 1-.7-.3c-.2-.3-.3-.6-.3-1a1 1 0 1 0-2 0c0 .4-.1.7-.3 1a1 1 0 0 1-.7.3.9.9 0 0 1-.7-.3c-.2-.3-.3-.6-.3-1a1 1 0 0 0-2 0 1.5 1.5 0 0 1-.2.8l-.1.2a1 1 0 0 1-.4.2L6 11a1 1 0 0 1-.5-.3h-.1c-.2-.3-.4-.6-.4-1v-.2l.1-.5.4-1.3ZM4 12l-.1-.1A3.5 3.5 0 0 1 3 9.7l.2-1.2a26.3 26.3 0 0 1 1.4-4.2A2 2 0 0 1 6.5 3h11a2 2 0 0 1 1.8 1.2A58 58 0 0 1 21 9.7a3.5 3.5 0 0 1-.8 2.3l-.2.2V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4c0 .6-.4 1-1 1H6a2 2 0 0 1-2-2v-6.9Zm9 2.9c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2a1 1 0 0 1-1-1v-2Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">Groups</span>
            </a>
          </li>
          <li onClick={() => handleNavigate("profile")}>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span class="ms-3">Profile</span>
            </a>
          </li>
          <li onClick={() => handleNavigate("signout")}>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg  hover:text-red-700 hover:bg-gray-100 dark:hover:bg-gray-700 group dark:text-white dark:hover:text-red-700" style={{
              
              }}
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-red-700  dark:group-hover:text-red-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default sidebar