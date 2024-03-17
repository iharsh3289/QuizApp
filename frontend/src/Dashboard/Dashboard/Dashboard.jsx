import React, {useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import Lists from "../components/lists"
import Navbar from "../components/top"
import axios from "axios";

const Dashboard = () => {
    const [search, setsearch]=useState("");
    const[ global_group,setglobalgroup]=useState([]);
    const[ joined_group,setjoinedgroup]=useState([]);
    const[ created_group,setcreatedgroup]=useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
  axios.get('http://127.0.0.1:8000/global_groups', {
    headers: {
      'Authorization': 'Token'.concat(' ',token),
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    setglobalgroup(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

  axios.get('http://127.0.0.1:8000/created_groups', {
    withCredentials : true ,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    setcreatedgroup(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

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
}, []);

  return (
    <div class="bg-gray-200 dark:bg-gray-700">
      <Navbar setsearch={setsearch}/>
      <Sidebar/>
      <Lists search={search} created_group={created_group} global_group={global_group} joined_group={joined_group}/>
    </div>
  );
};

export default Dashboard;