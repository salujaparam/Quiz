import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = (props) => {
  const [questionsCount, setQuestionsCount] = useState(20);
  const [numberRange, setNumberRange] = useState(10);
  const operators = ["Add", "Subtract", "Divide", "Multiply"];
  const [selectedOperators, setSelectedOperators] = useState([
    "Add",
    "Subtract",
    "Divide",
    "Multiply",
  ]);
  console.log("operators", operators);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOperators(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Practice On:</h4>
        <FormControl sx={{ m: 1, width: 250 }} style={{ color: "white" }}>
          <InputLabel id="demo-multiple-name-label">Operators</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedOperators}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {operators.map((operator) => (
              <MenuItem key={operator} value={operator} style={{}}>
                {operator}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Total Questions:</h4>
        <FormControl sx={{ m: 1, width: 250 }} style={{ color: "white" }}>
          <TextField
            required
            id="outlined-required"
            label="Questions"
            type="number"
            value={questionsCount}
            onChange={(e) => setQuestionsCount(e.target.value)}
          />
        </FormControl>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h4>Range of Operands:</h4>
        <FormControl sx={{ m: 1, width: 115 }} style={{ color: "white" }}>
          <TextField
            disabled
            required
            id="outlined-required"
            label="Lower"
            type="number"
            value={1}
          />
        </FormControl>
        <span>-</span>
        <FormControl sx={{ m: 1, width: 110 }} style={{ color: "white" }}>
          <TextField
            required
            id="outlined-required"
            label="Upper"
            type="number"
            value={numberRange}
            onChange={(e) => setNumberRange(e.target.value)}
          />
        </FormControl>
      </div>
      <span
        style={{ margin: "5px 0px 5px 0px", fontSize: "15px", color: "red" }}
      >
        **You can't go back to a previous question!**
      </span>
      <Button
        onClick={() => {
          // add checks
          let data = {
            questionsCount,
            numberRange,
            operators:
              selectedOperators.length > 0 ? selectedOperators : operators,
          };
          props.handleStartQuiz(data);
        }}
        variant="contained"
      >
        Start Quiz!!
      </Button>
    </div>
  );
};

export default Home;
