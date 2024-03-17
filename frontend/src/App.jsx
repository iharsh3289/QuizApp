import { useState } from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import '../src/style.scss'
import Creategroup from './Dashboard/Create/crate'
import Quizzes from './Dashboard/Quizzes/Quizzes'
import Home from "../src/game/components/Home"
import Play from './game/components/quiz/Play'
import QuizSummary from './game/components/quiz/QuizSummary'
import Dashboard from './Dashboard/Dashboard/Dashboard'
import Admin from './Dashboard/components/modals/admin'
import Reset from './pages/resetpassword'
import Otpverify from './pages/emailVerify'
import CreateQuiz from './Dashboard/components/modals/create/create'
import Userleave from './Dashboard/components/modals/userleave'
import Profile from './Dashboard/components/profile'
function App() {

    function ProtectedRoute({children}){
        if(localStorage.getItem('isLoggedIn')==null){
    return <Navigate to={'/login'}/>

        }
        return children;
    }
  return (
    <Router>
      <Routes>
          <Route path='/'>
              <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/dashboard/profile" element={<Profile/>}/>

      <Route path="/dashboard/admin" element={<Admin/>}/>
      <Route path="/dashboard/userleave" element={<Userleave/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/reset" element={<Reset />}/>
      <Route path="/verify" element={<Otpverify />}/>
      <Route path="/dashboard/createquiz" element={<CreateQuiz/>}/>
       <Route path="/" element={<Dashboard/>}/>
     <Route path="/dashboard/creategroup" element={<Creategroup/>}/>
      <Route path="/dashboard/groups" element={<Quizzes/>}/>
      <Route path="/play" element={<Home/>}/>
      <Route path="/play/quiz" element={<Play/>}/>
      <Route path="/play/quizsummary" element={<QuizSummary/>}/>
              </Route>
      </Routes>
    </Router>

  )
}

export default App