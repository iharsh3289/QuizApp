import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import axios from 'axios';
import { mdiCubeOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
    function handleSubmit(e){
      
        e.preventDefault();
        const name=e.target[0].value;
        const email=e.target[1].value;
        const password=e.target[2].value;
        const image=e.target[4].files[0];
        var data = JSON.stringify({
          "email": email,
          "password": password,
          "name": name,
          "image":image
        });

        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/accounts/register',
          headers: { 
            'Content-Type': 'application/json',
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
         
          navigate('/verify', {state:response.data});
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  return (
    <section class="py-1 bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
      <Icon
              path={mdiCubeOutline}
              size={2}
              className="cube"
              class="dark:text-white"
            />
          InstaQuiz      
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-2 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={handleSubmit} class="space-y-2 md:space-y-2" action="#">
              <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rajesh" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                  <input
        id="file"
        style={{ display: "none" }}
        type="file"
        
      />
      <label
        htmlFor="file"
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaRegImage
          style={{
            width: "30px",
            height: "30px",
            color: "grey",
            cursor: "pointer",
          }}
        />
        <span style={{ fontSize: "20px", color: "grey" }}> Add your avtar</span>
      </label>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a onClick={()=>{navigate('/login')}} href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
 
export default Register