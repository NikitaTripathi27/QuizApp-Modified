import { QuestionMarkTwoTone } from "@mui/icons-material";
import "./Question.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Question = ({
  question,
  currentQuestion,
  answerArray,
  setAnswerArray,
}) => {

    const handleCheckboxChange = (index, value) => {

        const selected = [...answerArray[currentQuestion]];
        const answerIndex = selected.findIndex((val) => val === value);

        if (answerIndex === -1) {
            selected.push(value);
        } else {
            selected.splice(answerIndex, 1);
        }
        
        const newAnswerArr = answerArray.map((item) => item.slice());
        newAnswerArr[index] = selected;
        console.log(newAnswerArr);

        setAnswerArray(newAnswerArr);
    }

  return (
    <>
      <div className="container">
        <div className="ques-text">{question.question}</div>
        <div className="li-container">
          {question.options.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={answerArray[currentQuestion].includes(item)}
                value={answerArray[currentQuestion].includes(item)}
                onChange={() => handleCheckboxChange(currentQuestion, item)}
              />
              <label htmlFor={item} className="ques-text">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
