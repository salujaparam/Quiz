import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Result = ({ questions, handleRestart }) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    let correct = 0;
    for (let question of questions) {
      if (
        question.answer &&
        parseFloat(question.answer) === question.actualAnswer
      ) {
        correct += 1;
      }
      setResult((correct / questions.length) * 100);
    }
  }, [questions]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3>You scored {result}%</h3>
      </div>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <div key={question.id}>
              <h3>Question {question.id}.</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>Q) What is the value of {question.question}?</p>
                <span>Ans) {question.actualAnswer}</span>
                <span
                  style={
                    !question.answer ||
                    parseFloat(question.answer) !== question.actualAnswer
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {" "}
                  {"->"} {question.answer || "Unanswered"}
                </span>
              </div>
              {question.id !== questions.length && (
                <hr style={{ border: "1px solid black" }} />
              )}
            </div>
          );
        })}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ width: "5rem", margin: "1rem 0 1rem 0" }}
          onClick={handleRestart}
          variant="contained"
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default Result;
