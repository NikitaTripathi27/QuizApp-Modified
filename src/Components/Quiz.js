import "./Quiz.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Questions/Question1";
import { useNavigate } from "react-router-dom/dist";
import config from "./config"
const Quiz = () => {
  const navigate = useNavigate();
  const [queslist, setqueslist] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);

  const getQuestionList = async () => {
    try {
      const response = await axios.get('https://quiz-app-dq0r.onrender.com/v1/ques/all');
      // const response = await axios.get('http://localhost:8082/v1/ques/all');
      console.log(response.data);
      setqueslist(response.data);
      setAnswerArray(response.data.map(() => []));
    } catch (error) {
      console.error("Error fetching question list:", error);
    }
  };

  useEffect(() => {
    getQuestionList();
    console.log(answerArray)
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < queslist.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  }; 

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const areArraysEqual = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false; // Arrays have different lengths
    }
  
    const sortedArray1 = array1.slice();
    const sortedArray2 = array2.slice();

    sortedArray1.sort();
    sortedArray2.sort();

    console.log(sortedArray1, sortedArray2);
  
    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false; // Arrays have different elements
      }
    }
  
    return true; // Arrays have the same elements
  };
  

  const calculateResult = () => {
    let score = 0;

    for (let i = 0; i < queslist.length; i++) {
      if (areArraysEqual(queslist[i].answer, answerArray[i])) score+=10;
    }

    return score;
  }

  const handleResult = () => {
    const score = calculateResult();
    navigate("/result", { state: { score: score } });
  };


  return (
    <>
      <div className="container">
        <h1 className="h-container">Welcome to Quiz</h1>
        {queslist.length > 0 && currentQuestion < queslist.length ? (
          <Question
            question={queslist[currentQuestion]}
            currentQuestion={currentQuestion}
            answerArray={answerArray}
            setAnswerArray={setAnswerArray}
          />
        ) : (
          <p>No questions available</p>
        )}
        <div className="btns">
          <button
            className="btn-1"
            onClick={handlePrevQuestion}
            disabled={currentQuestion <= 0}
          >
            Prev
          </button>
          <button
            className="btn-2"
            onClick={handleNextQuestion}
            disabled={currentQuestion >= queslist.length - 1}
          >
            Next
          </button>
          {currentQuestion >= queslist.length - 1 && (
            <button className="btn-3" onClick={handleResult}>
              Result
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
