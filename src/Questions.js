function Questions({ questions, dispatch, answer }) {
  const handleAnswer = answer !== null;
  return (
    <>
      <h4>{questions.question}</h4>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            disabled={handleAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              handleAnswer
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}
export default Questions;
