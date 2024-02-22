function StartScreen({ questions, dispatch }) {
  const numQuestions = questions.length;
  return (
    <>
      <h2>Welcome To React Quizz</h2>
      <h3>{numQuestions} Question to check your react skill</h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's Start
      </button>
    </>
  );
}
export default StartScreen;
