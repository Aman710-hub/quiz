import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    // index change when we click "nextQusetion"
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // we getting new array of all incorrect_answers and correct_answers
  const answers = [...incorrect_answers];
  // just give us random number between 0-3
  const tempIndex = Math.floor(Math.random() * 4);

  // ???????????????????????????????????????????????????????????
  // if random number will be 3
  if (tempIndex === 3) {
    // The push() method adds new items to the end of an array.
    answers.push(correct_answer);
    console.log(answers);
    console.log(correct_answer);
    // console.log(answers.push(correct_answer));
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  // ??????????????????????????????????????????????????????????/

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          {/* how many qs we answered correct / how many qs we have at all */}
          correct_answers : {correct}/{index}
        </p>
        <article className="container">
          {/* dangerouslySetInnerHTML is a property that you can use on HTML elements 
          in a React application to programmatically set their content. Instead of using 
          a selector to grab the HTML element, then setting its innerHTML, you can use this property
           directly on the element. */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  // THIS IS HOW I CAN CHECK ANSWER
                  onClick={() => checkAnswer(correct_answer === answer)}
                  key={index}
                  className="answer-btn"
                  // here we setting content of this btn with "dangerouslySetInnerHTML"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button onClick={nextQuestion} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
