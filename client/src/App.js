import React, { useState, useCallback } from "react";
import "./App.css";

// import component
import Tabs from "./components/molecules/Tabs";
import TextField from "./components/atoms/TextField";

function App() {
  const [result1, setResult1] = useState({ __html: "" });

  const test1 = value => {
    let tempResult = "";
    let tempStar = "";
    for (let i = 0; i <= value; i++) {
      for (let j = 0; j < value - i; j++) {
        tempStar += "&nbsp;";
      }
      for (let k = 0; k < i; k++) {
        tempStar += "*";
      }
      tempStar = `${tempStar}<br />`;
    }
    tempResult = { __html: tempStar };
    setResult1(tempResult);
  };

  const onChange = useCallback((id, fill) => {
    if (id === "test1") {
      test1(fill);
    }
  }, []);

  return (
    <div className="App">
      <h1>Testing</h1>
      <Tabs>
        <div label="Test 1">
          <TextField
            onChange={e => onChange("test1", e.target.value)}
            placeholder="Input your number"
            type="number"
          ></TextField>
          <div
            style={{
              fontSize: "24px"
            }}
            dangerouslySetInnerHTML={result1}
          ></div>
        </div>
        <div label="Croc">
          After &apos;while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  );
}

export default App;
