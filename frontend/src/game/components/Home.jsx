import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@mdi/react";
import Play from "./quiz/Play";
import "../styles/components/home.scss";
import "../styles/base/base.scss";
import { mdiCubeOutline } from "@mdi/js";
const Home = () => {
  const location=useLocation();
  const ques_data=location.state.quesDATA2;
  console.log(ques_data);
  const navigate=useNavigate();
  function handlePlay(){

    console.log("fghdjs", ques_data)
    navigate('/play/quiz', {state:{quesDATA: ques_data, quiz_id: location.state.quiz_id}});
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
    // localStorage.clear();
  }
  function handleExit(){
    navigate("/dashboard");
    localStorage.clear();
  }
  if(localStorage.getItem('Seconds')!==null){
    localStorage.removeItem('Seconds');
  }
  return (
    // here fragment will not be rendered
    <Fragment>
      {/* helemet is used while rendering in seo */}
      <Helmet>
        <title>Quiz App-Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div>
            <Icon path={mdiCubeOutline} size={5} className="cube" />
          </div>
          
          <div className="buttons">
          <h1>InstaQuiz</h1>
          <div className="play-button" onClick={handlePlay}>
             Play
          </div>
          <div className="exit-button" onClick={handleExit}>
            Exit
          </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
