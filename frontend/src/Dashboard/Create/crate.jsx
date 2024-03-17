import React from 'react'
import Navbar from "../components/top"
import Create from "../components/create"
import Sidebar from "../components/sidebar";


const crate = () => {
  return (
    <div class="bg-gray-700 dark:bg-gray-700">
      <Navbar/>
      <Sidebar/>
      <Create/>
    </div>
  )
}

export default crate