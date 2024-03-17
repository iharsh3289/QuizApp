import React from "react";
import { useEffect, useState } from "react";
import Load from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Public from "../components/modals/public";
import Private from "../components/modals/private";
import Admin from "../components/modals/admin";
import Userleave from "../components/modals/userleave";
import Create from "./modals/create/create.jsx";
import axios from "axios";
const lists = ({search, global_group , joined_group , created_group}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [modal, setmodal] = useState();
  const [close, setclose] = useState(false);
  const [quizdata, setquizdata]=useState([]);

  useEffect(() => {
    // Simulate loading time with setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3 seconds of loading time

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, []);
  const handleCreateGroup = () => {
    // Navigate to the desired route when the button is clicked
    navigate("/dashboard/creategroup");
  };
  const handleleavepopup = (a, group_name, group_privacy) => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/get_quiz', {group_id:a },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},},)
  .then((response) => {
      setquizdata(response.data)
    setclose(true);
    setmodal(<Userleave quizdata={response.data} group_id={a} group_name={group_name} group_privacy={group_privacy} setclose={setclose} />);
  })
  .catch((error) => {
    console.log(error);
  });



  };
  const handleadminpopup = (a, group_name, group_privacy) => {

    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/get_quiz', {group_id:a },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},},)
  .then((response) => {
      setquizdata(response.data)
    setclose(true);
    setmodal(<Admin setclose={setclose} quizdata={response.data} group_id={a} group_name={group_name} group_privacy={group_privacy} setclose={setclose} />);
  })
  .catch((error) => {
    console.log(error);
  });


  };
  const handleprivatepopup = (a, group_name, group_privacy) => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/get_quiz', {group_id:a },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},})
  .then((response) => {
      setquizdata(response.data)
    setclose(true);
    setmodal(<Private quizdata={response.data} group_id={a} group_name={group_name} group_privacy={group_privacy} setclose={setclose} />);
  })
  .catch((error) => {
    console.log(error);
  });


  };
  const handlepublicpopup = (a, group_name, group_privacy) => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/get_quiz', {group_id:a },{headers: {'Authorization': 'Token'.concat(' ',token), 'Content-Type': 'application/json',},})
  .then((response) => {
      setquizdata(response.data)
      console.log(response.data)
    setclose(true);
    setmodal(<Public quizdata={response.data} group_id={a} group_name={group_name} group_privacy={group_privacy} setclose={setclose} />);
  })
  .catch((error) => {
    console.log(error);
  });


  };

 
  return (
    <>
      {isLoading ? (
        <Load />
      ) : (

        <div class="pt-2 md:ml-60 px-0">
          <div class="pt-5 pl-5 pr-2 rounded-lg" style={{marginTop:"9vh"}}>
            <div class="grid grid-cols-2 gap-3 w-full ">
              <div>
                <div
                  class=" dark:text-white flex justify-between flex-col items-center pt-5 pl-8 md:h-44 lg:h-32 bg-gray-50 dark:bg-gray-800"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "2rem",
                  }}
                >

                  <div>Global Groups</div>
                  <div>
                    <button
                      onClick={handleCreateGroup}
                      type="button"
                      class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-2 text-center me-5 mb-2"
                    >
                      Create Group
                    </button>
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                      onClick={() => {
                        navigate("/play");
                      }}
                    >
                      Play random quiz
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    scrollbarWidth: "none",
                    overflow: "scroll",
                    height: "71vh",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  }}
                  class="pt-5 pl-12 bg-gray-50 dark:bg-gray-800"
                >
                  {close && modal}
                  {global_group.map((group) => {
                    if (
                      group.group_name.includes(search) ||
                      group.group_name.includes(
                        search.charAt(0).toUpperCase() + search.slice(1)
                      )
                    ) {
                      return (
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
                                onClick={() => {
                                  group.group_privacy === "Public"
                                    ?handlepublicpopup(group.group_id, group.group_name, group.group_privacy)
                                    :handleprivatepopup(group.group_id, group.group_name, group.group_privacy)
                                }}
                                href="#"
                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                View Group
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div class="grid grid-rows-2 grid-cols-1 gap-2" >
              <div >
                <div
                  class="pt-1 bg-gray-50 dark:bg-gray-800 dark:text-white"
                  style={{
                    width: "100%",
                    height: "4vh",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Groups Joined
                </div>

                <div
                  style={{
                    scrollbarWidth: "none",
                    overflow: "scroll",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    height: "39.5vh",
                  }}
                  class="pt-5 bg-gray-50 dark:bg-gray-800"
                >
                  {joined_group.map((group) => (
                    <div
                    key={group.group_id}
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
                            href="#"
                            onClick={()=>{handleleavepopup(group.group_id, group.group_name, group.group_privacy)}}
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            View Group
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div >
                <div
                  class=" pt-3 bg-gray-50 dark:bg-gray-800 dark:text-white"
                  style={{
                    width: "100%",
                    height: "5vh",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Groups Created
                </div>

                <div
                  style={{
                    scrollbarWidth: "none",
                    overflow: "scroll",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    height: "38.5vh",
                  }}
                  class="pt-5 bg-gray-50 dark:bg-gray-800 "
                >
                  {created_group.map((group) => (
                  <div key={group.group_id}
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
                          onClick={()=>{handleadminpopup(group.group_id, group.group_name, group.group_privacy)}}
                          href="#"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          View Group
                        </a>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default lists;
