import React, { Component, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Icon } from "@mdi/react";
import "../../styles/components/play.scss";
import { mdiClockOutline, mdiLightbulbOn, mdiSetCenter } from "@mdi/js";
// import questions from "../../components/questions.json";
import correctNotification from "../../assets/audio/correct-answer.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
function Play() {
  const location=useLocation();
  const ques_data=location.state.quesDATA;
  console.log(ques_data);
  const questions=ques_data;
  const navigate=useNavigate();
  const [nextQuestion, setnextQuestion] = useState(1);
  const [numberofQuestions, setnumberofQuestions] = useState(questions.length);
  const [numberofAnsweredQuestions, setnumberofAnsweredQuestions] = useState(0);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [score, setscore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hints, setHints] = useState(questions[currentQuestionIndex].hints.length);
  const [usedHints, setusedHints] = useState(0);
  const [fiftyFifty, setfiftyFifty] = useState(2);
  const [usedFiftyFifity, setusedFiftyFifty] = useState(false);
  const [seconds, setSeconds] = useState(()=>{
    if(localStorage.getItem('Seconds')!==null){
      return parseInt(localStorage.getItem('Seconds'));
    }
    else{
      return 300;
    }
    });
  useEffect(() => {

    const storescore=localStorage.getItem('score');
    if ( storescore !== null) {
      setscore(parseInt(storescore));
    }
    const storeCorrectAnswers=localStorage.getItem('CorrectAnswers');
    if ( storeCorrectAnswers !== null) {
      setCorrectAnswers(parseInt(storeCorrectAnswers));
    }
    const storeWrongAnswers= localStorage.getItem('WrongAnswers');
    if ( storeWrongAnswers !== null) {
      setWrongAnswers(parseInt(storeWrongAnswers));
    }
    const storecurrentQuestionIndex= localStorage.getItem('currentQuestionIndex');
    if ( storecurrentQuestionIndex !== null) {
      setcurrentQuestionIndex(parseInt(storecurrentQuestionIndex));
    }
    const storenextQuestion =localStorage.getItem('nextQuestion');
    if ( storenextQuestion !== null) {
      setnextQuestion(parseInt(storenextQuestion));
    }
    const storenumberofAnsweredQuestions =  localStorage.getItem('numberofAnsweredQuestions');
    if ( storenumberofAnsweredQuestions !== null) {
      setnumberofAnsweredQuestions(parseInt(storenumberofAnsweredQuestions));
    }
    const storeHints= localStorage.getItem('Hints');
    if ( storeHints !== null) {
      setHints(parseInt(storeHints));
    }
    const storeusedHints=localStorage.getItem('usedHints');
    if ( storeusedHints!== null) {
      setusedHints(parseInt(storeusedHints));
    }
    const storefiftyFifty=localStorage.getItem('fiftyFifty');
    if ( storefiftyFifty!== null) {
      setfiftyFifty(parseInt(storefiftyFifty));
    }
    const storeusedfiftyFifty=localStorage.getItem('usedFiftyFifty');
    if ( storeusedfiftyFifty!== null) {
      setusedFiftyFifty(parseInt(storeusedfiftyFifty));
    }
    
    
    const timer = setInterval(() => {
     
      setSeconds(prevSeconds => prevSeconds - 1);     
      
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    
    if(minutes===0 && remainingSeconds===0){
      handleQuizEnd();
    }
    else{
      localStorage.setItem('Seconds', time);
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  };
  function handleQuizEnd(){
    alert("You have successfully attempted the Quiz");
    navigate('/play/quizsummary', {
      state: {
        totalQuestions: questions.length,
        CorrectAnswers: localStorage.getItem('CorrectAnswers')!=null? localStorage.getItem('CorrectAnswers'):0,
        usedFiftyFifty: localStorage.getItem('fiftyFifty')!=null? localStorage.getItem('fiftyFifty'):2,
        WrongAnswers: localStorage.getItem('WrongAnswers')!=null? localStorage.getItem('WrongAnswers'):0,
        usedHints:localStorage.getItem('usedHints')!=null? localStorage.getItem('usedHints'):0,
        quiz_id:location.state.quiz_id
      }
    });

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
  function handleOption(a) {
    if (
      questions[currentQuestionIndex].answer ===
      questions[currentQuestionIndex].options[a]
    ) {
      toast.success("Correct Answer", {autoClose: 1500});
      
      document.getElementById("correct-sound").play();
      setscore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      if(usedFiftyFifity){
        setusedFiftyFifty(!usedFiftyFifity);
        localStorage.setItem('usedFiftyFifty',!usedFiftyFifity);
      }
      localStorage.setItem('score', score + 1);
      localStorage.setItem('CorrectAnswers', correctAnswers + 1);
      
    } else {      
      toast.warning("Wrong Answer", {autoClose: 1500});
      document.getElementById("wrong-sound").play();
      setWrongAnswers(wrongAnswers + 1);
      if(usedFiftyFifity){
        setusedFiftyFifty(!usedFiftyFifity);
        localStorage.setItem('usedFiftyFifty', !usedFiftyFifity); 
      }  
      localStorage.setItem('WrongAnswers', wrongAnswers + 1);   
      
    }
    setTimeout(() => {
      if(currentQuestionIndex+1===numberofQuestions){
        handleQuizEnd();
      }
      for(let i=0; i<=2; i++){
        document.getElementById('option'+i).style.display="block";      
      }
      setcurrentQuestionIndex(currentQuestionIndex + 1);
      setnextQuestion(nextQuestion + 1);
      setnumberofAnsweredQuestions(numberofAnsweredQuestions + 1);
      setHints(questions[currentQuestionIndex].hints.length);
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1);
      localStorage.setItem('nextQuestion', nextQuestion + 1);
      localStorage.setItem('numberofAnsweredQuestions', numberofAnsweredQuestions + 1);
      localStorage.setItem('Hints', questions[currentQuestionIndex].hints.length);
    }, 1000);
  }
  
  function handleNextButtonClick(){
    if(usedFiftyFifity){
      setusedFiftyFifty(!usedFiftyFifity);
    }
    if(currentQuestionIndex+1===numberofQuestions){
      handleQuizEnd();
    }
    //if the options have none display
      for(let i=0; i<=2; i++){
        document.getElementById('option'+i).style.display="block";      
      }
      setcurrentQuestionIndex(currentQuestionIndex + 1);
      setnextQuestion(nextQuestion + 1);
      setHints(questions[currentQuestionIndex].hints.length);   
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1);
      localStorage.setItem('nextQuestion', nextQuestion + 1);
      localStorage.setItem('Hints', questions[currentQuestionIndex].hints.length);
  }
  function handleQuitButtonClick(){
    if(window.confirm("Are you sure you want to quit!")){
      handleQuizEnd()
    };

  }
  function handleHints(){
    if(hints>0){
      const temphint=[];
      toast(questions[currentQuestionIndex].hints[hints-1]);
      setusedHints(usedHints+1);
      setHints(hints-1);
      localStorage.setItem('usedHints', usedHints+1);
      localStorage.setItem('Hints', hints-1);
    }    
  }
  function handleFiftyfifty(){
  if(fiftyFifty>0 && !usedFiftyFifity){
    setfiftyFifty(fiftyFifty-1);
    setusedFiftyFifty(!usedFiftyFifity);
    localStorage.setItem('fiftyFifty', fiftyFifty-1);
    localStorage.setItem('usedFiftyFifty', !usedFiftyFifity);
      const optionList=questions[currentQuestionIndex].options;
    const ans=questions[currentQuestionIndex].answer;
    let temp=0;
    for(let i=0; i<=3; i++){
      if(optionList[i]!=ans && temp<2){
        document.getElementById('option'+i).style.display="none";
        temp++;
      }
    }
    }    
  }
  return (
    <Fragment>
      <Helmet>Quiz Page</Helmet>
      <Fragment>
        <audio id="correct-sound" src={correctNotification}></audio>
        <audio id="wrong-sound" src={wrongNotification}></audio>
        <audio id="button-sound" src={buttonSound}></audio>
      </Fragment>
      <div id="home">
        <div className="questions">
          <div className="lifeline-container">
            <div style={{ display: "flex" }} className="lifeline-icon" onClick={handleFiftyfifty}>
              <div >
                <Icon path={mdiSetCenter} size={1}/>
              </div>
              <div style={{ marginTop: "3px", marginLeft:"2px" }}>
                <span className="lifeline">{fiftyFifty}</span>
              </div>
            </div>
            <div style={{ display: "flex", cursor:"pointer" }} className="lifeline-icon"  onClick={handleHints}>
              <div >
                <Icon path={mdiLightbulbOn} size={1}/>
              </div>
              <div  style={{marginTop:"3px", marginLeft:"2px"}}>
                <span className="lifeline">{hints}</span>
              </div>
            </div>
          </div>
          <div className="lifeline-container">
            <div style={{ display: "flex" }}>
              {" "}
              <span>
                {currentQuestionIndex + 1} of {numberofQuestions}
              </span>
            </div>
            <div style={{ display: "flex"}}>
              <div>{formatTime(seconds)}</div>
              <Icon path={mdiClockOutline} size={1} style={{paddingLeft:"4px"}}/>
            </div>
          </div>
          <h5>{questions[currentQuestionIndex].question}</h5>
          <div className="options-container">
            <p className="option" id='option0' onClick={() => handleOption(0)}>
              {questions[currentQuestionIndex].options[0]}
            </p>
            <p className="option" id='option1' onClick={() => handleOption(1)}>
              {questions[currentQuestionIndex].options[1]}
            </p>
          </div>
          <div className="options-container">
            <p className="option" id='option2' onClick={() => handleOption(2)}>
              {questions[currentQuestionIndex].options[2]}
            </p>
            <p className="option" id='option3' onClick={() => handleOption(3)}>
              {questions[currentQuestionIndex].options[3]}
            </p>
          </div>
          <ToastContainer />
          <div className="button-container">
            <button onClick={handleNextButtonClick}>Next</button>
            <button onClick={handleQuitButtonClick}>Quit</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Play;
