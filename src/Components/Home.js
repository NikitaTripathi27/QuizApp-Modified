import "./Home.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };
  return (
    <div className="background">
      <h1 className="Home-container">Welcome to Quiz-era</h1>
      <ShareIcon />
      <ol className="txtfield">
        <li className="li-txt">You will be asked questions one by one . </li>
        <li className="li-txt">There are 10 questions in total .</li>
        <li className="li-txt">There can be multiple correct answer .</li>
        <li className="li-txt">Each question rewards 10 points .</li>
      </ol>
   
      <Button
        className="btn"
        variant="contained"
        color="success"
        onClick={handleStart}
      >
        Start Quiz
      </Button>
      </div>
    
  );
};

export default Home;
