function Progress({ numQuestions, index, points }) {
  return (
    <header className="progress">
      <progress value={index} max={numQuestions} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/250
      </p>
    </header>
  );
}
export default Progress;
