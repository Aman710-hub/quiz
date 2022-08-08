import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>
          {/* amuont */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              // The 'min/max' attributes specify the minimum value for an <input> element.
              min={1}
              max={50}
            />
          </div>

          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            {/* The <select> element is used to create a drop-down list. */}
            {/* The id attribute is needed to associate the drop-down list with a label. */}
            {/* The <option> tags inside the <select> element define the available options in the drop-down list. */}
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              cant generate questions, please try diffrent options
            </p>
          )}
          <button
            className="submit-btn"
            onClick={handleSubmit}
            value={quiz.amount}
            onChange={handleChange}
          >
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
