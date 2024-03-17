import React, { useState } from 'react'
import AddedQuestion from './components/addedQuestion.jsx'
import './styles/components/create.scss'
import { Icon } from "@mdi/react";
import {mdiArrowLeftThin} from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useLocation} from "react-router-dom";
const Create = ({ setnothing}) => {
  const [questions, setquestions]=useState([]);
  const [quizname, setquizname]=useState();
  const navigate=useNavigate();
  const location=useLocation();
  const group=location.state.groupID;
  function handlePublish(){
    console.log(group)
    const final={
      quiz_data:{"quiz_title": quizname},
      question_data:questions,
      group_id:group
    }
    const token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/createquizwithquestion', final,
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token'.concat(' ',token),
        },
      })
      .then((response) => {
        navigate('/');
          console.log("succesfully quiz created")

      }).catch((error)=>{
          console.log(error)
      })
setnothing(false);
    console.log(final);

  }
  function handleSubmit(e){
    e.preventDefault();
    const question={
      question:"",
      option_a:"",
      option_b:"",
      option_c:"",
      option_d:"",
      hint_a:"",
      hint_b:"",
      answer:""
    }
    setquizname(e.target[1].value);
    question.question=e.target[2].value;
    question.option_a=e.target[3].value;
    question.option_b=e.target[4].value;
    question.option_c=e.target[5].value;
    question.option_d=e.target[6].value;
    question.hint_a=e.target[7].value;
    question.hint_b=e.target[8].value;
    
    question.answer=e.target[9].value;
    const temp={
      "question": question
    }
    
    setquestions((prev)=>[...prev, temp]);
   
  }
  return (
    <>

    <form className='create-quiz' onSubmit={handleSubmit}>
      <div className='add-your-quiz'>
      <div onClick={()=>{
        console.log('sdger')
      navigate('/')}}>
        <Icon className='arrow' path={mdiArrowLeftThin} size={2.4}/>
      </div>
        <h1>Add your Quiz</h1>
        <div className='publish'>
          <button type='button' className='publish-button' onClick={handlePublish}>Publish</button>
          <div className='quiz-name'><input type="text" placeholder='Quiz Name' required/></div>
        </div>
      </div>
      <div className='add-question'>
        <div>Question</div>
        <div><input type="text" placeholder='Question'  required /></div>
      </div>
      <div className='options'>
        <div>
          <div>Option 1</div>
          <div><input type="text" placeholder='Enter the option 1'  required /></div>
        </div>
        <div>
          <div>Option 2</div>
          <div><input type="text" placeholder='Enter the option 2'  required /></div>
        </div>
        <div>
          <div>Option 3</div>
          <div><input type="text" placeholder='Enter the option 3'  required /></div>
        </div>
        <div>
          <div>Option 4</div>
          <div><input type="text" placeholder='Enter the option 4'  required /></div>
        </div>
      </div>
      <div className='options hints'>
      <div>
          <div>Hint 1</div>
          <div><input type="text" placeholder='Enter the hint'  required /></div>
        </div>
        <div>
          <div>Hint 2</div>
          <div><input type="text" placeholder='Enter the hint'  required /></div>
        </div>
      </div>
      <div>
        <div>Answer of above question</div>
        <div><input type="text" placeholder='Enter the answer'  required /></div>
      </div>
      <div>
      <button className='add-button' type="submit"  >Add Question</button>
      </div>
      <div className='added-question'>
        {
          questions.map((question, index)=>(
          <AddedQuestion question={question} key={index} setquestions={setquestions} questions={questions} key2={index}/>          
          ))
        }      
      </div>
    </form>
    </>
  )
}


export default Create