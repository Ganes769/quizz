import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import { queries } from "@testing-library/react";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "datarecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("error");
  }
}
function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchQuestions() {
      await fetch("http://localhost:3000/questions")
        .then((questions) => questions.json())
        .then((questions) =>
          dispatch({ type: "datarecieved", payload: questions })
        );
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            questions={questions}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
            />
            <Questions
              answer={answer}
              dispatch={dispatch}
              questions={questions[index]}
            />
            <NextButton
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && <FinishScreen points={points} />}
      </Main>
    </div>
  );
}

export default App;
