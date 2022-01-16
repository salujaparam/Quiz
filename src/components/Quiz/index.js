import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const Quiz = ({ questions, handleSubmitQuiz }) => {
  const [updatedQuestions, setUpdatedQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [section, setSection] = useState(1);

  useEffect(() => {
    setUpdatedQuestions([]);
    setSelectedQuestion(questions[0]);
  }, [questions]);

  const handleClick = () => {
    if (selectedQuestion.id === questions.length) {
      let data = [...updatedQuestions, selectedQuestion];
      setUpdatedQuestions(data);
      handleSubmitQuiz(data);
    } else {
      setUpdatedQuestions([...updatedQuestions, selectedQuestion]);
      let findQuestion = questions.find(
        (question) => question.id === selectedQuestion.id + 1
      );
      if (findQuestion.id > Math.floor((questions.length - 1) / 2)) {
        setSection(2);
      }
      setSelectedQuestion(findQuestion);
      // update section also
    }
  };

  return (
    <div>
      {/* <Tabs value={"section2"} aria-label="basic tabs example">
        <Tab value="section1" label="Section 1" textColor="secondary" />
        <Tab value="section2" label="Section 2" textColor="secondary" />
      </Tabs> */}
      {selectedQuestion && (
        <div>
          <div>
            <span
              style={
                section === 1
                  ? { marginRight: "1rem", borderBottom: "1px solid black" }
                  : { marginRight: "1rem" }
              }
            >
              Section 1
            </span>
            <span
              style={section === 2 ? { borderBottom: "1px solid black" } : {}}
            >
              Section 2
            </span>
          </div>
          <h3>Question {selectedQuestion.id}.</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>What is the value of {selectedQuestion.question}?</p>
            <FormControl sx={{ m: 1, width: 200 }} style={{ color: "white" }}>
              <TextField
                id="outlined-required"
                label="Answer"
                value={selectedQuestion.answer || ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    answer: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              style={{ width: "10rem" }}
              onClick={handleClick}
              variant="contained"
            >
              {selectedQuestion.id === questions.length ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
