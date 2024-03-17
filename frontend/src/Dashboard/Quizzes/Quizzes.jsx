import React from 'react'
import Navbar from "../components/top"

import Sidebar from "../components/sidebar";
import Quizz from "../components/Quizzes"
const Quizzes = () => {

  return (
    <div class="bg-gray-100 dark:bg-gray-700">
      <Navbar/>
      <Sidebar/>
      <Quizz/>
    </div>
  )
}

export default Quizzes