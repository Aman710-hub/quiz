import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

//
const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

// default API url
const API_ENDPOINT = "https://opentdb.com/api.php?";

// const url = "";
// const tempUrl = "https://opentdb.com/api.php?amount=10&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // waiting - if waintin true then "setupForm" will be displayed
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetchin data
  const fetchData = async (url) => {
    setLoading(true);
    // when we fetching data "setupForm" will disopear
    setWaiting(false);

    // this is how we fetch data with "axion"
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      // when there is some error in this API it will give emty array
      // we can have nesed if statements
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
        // if data length is less then 0
      } else {
        // display start menu
        setWaiting(true);
        // display error
        setError(true);
      }
      // if "response" false then we just jump back to "setupForm"
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      // if "index" bigger then "questions" array's length
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  // when we check on answer btns this function runs
  // value - is "true" or "fales"
  const checkAnswer = (value) => {
    if (value) {
      // adding +1 to currect answers
      setCorrect((oldState) => oldState + 1);
    }
    // if "value" is false then we just jump to the next question
    nextQuestion();
  };

  // why do we create this function if we dont use this ?????????????????????????????????????????
  const openModal = () => {
    setIsModalOpen(true);
  };

  // on click "PLAY AGAIN"
  const closeModal = () => {
    setCorrect(0);
    setWaiting(true);
    setIsModalOpen(false);
  };

  // function runs when we do changes in input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // [name] - whatever is inside "name" variable
    // egpl - difficulty: easy
    setQuiz({ ...quiz, [name]: value });
  };

  // this function will run when we click "START" btn
  const handleSubmit = (e) => {
    e.preventDefault();
    // this is how we buld our own url
    const url = `${API_ENDPOINT}amount=${quiz.amount}&difficulty=${
      quiz.difficulty
    }&category=${table[quiz.category]}&type=multiple`;
    // we fetch data only when we click btn "start"
    fetchData(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
