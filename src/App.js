import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);

  const handleStartQuiz = (data) => {
    const { questionsCount, numberRange, operators } = data;
    let newData = [];
    for (let i = 1; i <= questionsCount; i++) {
      let obj = {};
      let num1 = Math.floor(Math.random() * numberRange + 1);
      let num2 = Math.floor(Math.random() * numberRange + 1);
      let operator = operators[Math.floor(Math.random() * operators.length)];
      obj.id = i;
      if (operator === "Add") {
        obj.question = `${num1} + ${num2}`;
        obj.actualAnswer = num1 + num2;
        obj.type = "Addition";
      } else if (operator === "Subtract") {
        obj.question = `${num1} - ${num2}`;
        obj.actualAnswer = num1 - num2;
        obj.type = "Subtraction";
      } else if (operator === "Divide") {
        obj.question = `${num1} / ${num2}`;
        obj.actualAnswer = num1 / num2;
        obj.type = "Divison";
      } else if (operator === "Multiply") {
        obj.question = `${num1} * ${num2}`;
        obj.actualAnswer = num1 * num2;
        obj.type = "Multiplication";
      }
      newData.push(obj);
    }
    setQuestions(newData);
    setScreen("quiz");
  };

  const handleSubmitQuiz = (data) => {
    // update questions based on data
    console.log(data);
    setQuestions(data);
    setScreen("result");
  };

  const handleRestart = () => {
    setScreen("home");
  };

  const showApp = () => {
    switch (screen) {
      case "home":
        return <Home handleStartQuiz={handleStartQuiz} />;
      case "quiz":
        return (
          <Quiz questions={questions} handleSubmitQuiz={handleSubmitQuiz} />
        );
      case "result":
        return <Result questions={questions} handleRestart={handleRestart} />;
    }
  };

  return (
    <div className={screen === "result" ? "app-result" : "app"}>
      {showApp()}
    </div>
  );
}
