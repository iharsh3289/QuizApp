import React, { Fragment } from 'react'
import { Helmet } from "react-helmet";
import { Icon } from "@mdi/react";
import { mdiCheckCircle, mdiCheckCircleOutline } from '@mdi/js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/components/summary.scss'
import axios from "axios";

const QuizSummary = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const { totalQuestions, CorrectAnswers,usedFiftyFifty,WrongAnswers,usedHints } = location.state;

    let stats, remark;
    const hintWeightage = 0.1; // 10% deduction for each hint used
    const fiftyFiftyWeightage = 0.05; // 5% deduction for each fifty-fifty used

    // Calculate total deductions based on hints used and fifty-fifty used
    const totalDeductions = usedHints * hintWeightage+ (-1*usedFiftyFifty +2 )* fiftyFiftyWeightage;

    // Calculate raw score (number of correct answers)
    const rawScore = CorrectAnswers;

    // Calculate total score after deductions
    const totalScore = rawScore - totalDeductions-WrongAnswers;

    // Calculate percentage score
    const score = Math.round((totalScore / totalQuestions) * 100);
    if(score<20){
        remark='You need more practice!';
    }
    else if(score<50){
        remark='Better luck next time';
    }
    else{
        remark='You are almost genius';
    }
    let attempted=WrongAnswers;
    if(CorrectAnswers>0){
        attempted+=CorrectAnswers;
    }
    const hints=2-(usedFiftyFifty) ;
    function handleClick(){
        var data={
            'Total_questions':totalQuestions,
            'wrong_questions':WrongAnswers,
            'Correct_questions':CorrectAnswers,
            'percentage':score,
            'quiz_id':location.state.quiz_id

        }
        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/finish_quiz', data,{
            headers: {
                'Authorization': 'Token'.concat(' ',token),
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
        navigate('/');
    }

    if(attempted==0){
        stats=(
            <section style={{gap:"30px",display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center",backgroundColor:"black", width:"100vw", height:"100vh", color:"rgb(247, 90, 90)"}}>
                <h1 className='no-stats' style={{fontSize:"50px"}}>No statistics Available</h1>
                <div style={{cursor:"pointer",padding:"5px",border:"2px solid rgb(247, 90, 90)"}}>
                    <Link to="/">Back to home</Link>
                </div>

            </section>
        );
    }
    else{

        stats=(
            <Fragment>
                <div className='main'>
                    <div className='fragment-container'>
                        <div>
                            <Icon path={mdiCheckCircleOutline} size={5} style={{color:"rgb(164, 118, 205)"}}/>
                        </div>
                        <h1>Quiz has ended</h1>
                        <div className='container'>
                            <h4>{remark}</h4>
                            <h2>Your Score: {score}%</h2>
                            <div className='inside'>
                                <div className='stat left'>Total number of questions:</div>
                                <div className='right'>{totalQuestions}</div>
                            </div>

                            <div className='inside'>
                                <div className='stat left'>Number of attempted questions:</div>
                                <div className='right'>{attempted}</div>
                            </div>
                            <div className='inside'>
                                <div className='stat left'>Number of Correct Answers:</div>
                                <div className='right'>{CorrectAnswers}</div>
                            </div>

                            <div className='inside'>
                                <div className='stat left'>Number of Wrong Answers:</div>
                                <div className='right'>{WrongAnswers}</div>
                            </div>

                            <div className='inside'>
                                <div className='stat left'>Hints Used:</div>
                                <div className='right'>{usedHints}</div>
                            </div>

                            <div className='inside'>
                                <div className='stat left'>50-50 Used:</div>
                                <div className='right'>{hints}</div>
                            </div>
                        </div>
                        <section>
                            <div onClick={handleagain} style={{ padding:"5px",border:"5px solid rgb(164, 118, 205)", cursor:"pointer"}}>
                                <div onClick={handleClick}>Back to home</div>
                            </div>


                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }
    function handleagain(){
        localStorage.removeItem('Seconds');
        localStorage.removeItem('score');
        localStorage.removeItem('CorrectAnswers');
        localStorage.removeItem('usedFiftyFifty');
        localStorage.removeItem('WrongAnswers');
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('nextQuestion');
        localStorage.removeItem('numberofAnsweredQuestions');
        localStorage.removeItem('Hints');
        localStorage.removeItem('usedHints');
        localStorage.removeItem('fiftyFifty');
    }
    return (
        <Fragment>
            <Helmet><title>Quiz App</title></Helmet>
            {stats}
        </Fragment>
    )
}

export default QuizSummary