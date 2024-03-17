import React from 'react'
import { Icon } from "@mdi/react";
import '../styles/components/addedQuestion.scss'
import { mdiDeleteEmpty } from '@mdi/js';
const addedQuestion = ({question, key2, questions, setquestions}) => {
    function handleDelete(id){
        let array=[];
        for(let i=0; i<questions.length; i++){
            if(id!=i){
                array.push(questions[i]);
            }
        }
        setquestions(array);
    }
  return (
    <div className="question-container" id={`${key2}`}>
        <div>
            {question.question.question}
        </div>
        <div>
            <div>Options:</div>
        <div className='options'>
            <div>{question.question.option_a}</div>
            <div>{question.question.option_b}</div>
            <div>{question.question.option_c}</div>
            <div>{question.question.option_d}</div>
        </div> 
        </div>
        <div>
            <div>Hints:</div>
        <div className='options'>
            <div>{question.question.hint_a}</div>
            <div>{question.question.hint_b}</div>
        </div> 
        </div>
        <div style={{display:"flex",width:"100%", alignItems:"center", gap:"20px"}}>
            <div>Complete Answer:</div>
            <div className='options'>
            <div>{question.question.answer}</div>
        </div> 
        </div>
        <div style={{display:"flex",width:"100%", justifyContent:"end"}}>
            <div onClick={()=>handleDelete(key2)}><Icon className='arrow' path={mdiDeleteEmpty} size={2}  style={{cursor:"pointer"}} /></div>
        </div>
    </div>
  )
}

export default addedQuestion