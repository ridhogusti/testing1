import React, { useState, useCallback } from "react";
import "./App.css";

// import component
import Tabs from "./components/molecules/Tabs";
import Testing from "./components/molecules/Testing";

function fibonacci(n) {
  if (n === 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
function App() {
  const [result1, setResult1] = useState({ __html: "" });
  const [result2, setResult2] = useState({ __html: "" });
  const [result3, setResult3] = useState({ __html: "" });
  const [result4, setResult4] = useState({ __html: "" });

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

  const test2 = value => {
    let tempResult = "";
    let tempStar = "";
    for (let i = 0; i < value; i++) {
      if (i === 0 || i === value - 1) {
        for (let j = 0; j < value; j++) {
          tempStar += "*";
        }
        tempStar = `${tempStar}<br />`;
      }
      if (i > 0 && i < value - 1) {
        for (let j = 0; j < value; j++) {
          if (j === 0 || j === value - 1) {
            tempStar += "*";
          } else if (j >= 1 && j <= value - 1) {
            tempStar += "&nbsp";
          }
        }
        tempStar = `${tempStar}<br />`;
      }
    }
    tempResult = { __html: tempStar };
    setResult2(tempResult);
  };

  const test3 = value => {
    let tempResult = "";
    let tempStar = "";
    let tempValue = Math.ceil(value / 2);
    for (let i = 1; i <= tempValue; i++) {
      for (let j = 0; j < tempValue - i; j++) {
        tempStar += "&nbsp;";
      }
      for (let j = 0; j < 2 * i - 1; j++) {
        tempStar += "*";
      }
      tempStar = `${tempStar}<br />`;
    }
    for (let i = 1; i <= tempValue; i++) {
      for (let j = 0; j < i - 1; j++) {
        tempStar += "&nbsp;";
      }
      for (let j = 0; j < 2 * (tempValue - i) + 1; j++) {
        tempStar += "*";
      }
      tempStar = `${tempStar}<br />`;
    }
    tempResult = { __html: tempStar };
    setResult3(tempResult);
  };

  const test4 = value => {
    let tempResult = "";
    let hasil = 0;
    let counter = 2;
    let tempHasil = "";
    while (hasil < value) {
      if (hasil > 0) {
        tempHasil += `${hasil}<br />`;
      }
      hasil = fibonacci(counter);
      counter++;
    }
    tempResult = { __html: tempHasil };
    setResult4(tempResult);
  };

  const onChange = useCallback((id, fill) => {
    if (id === "test1") {
      test1(fill);
    } else if (id === "test2") {
      test2(fill);
    } else if (id === "test3") {
      test3(fill);
    } else if (id === "test4") {
      test4(fill);
    }
  }, []);

  return (
    <div className="App">
      <h1>Testing</h1>
      <Tabs>
        <div label="Test 1">
          <Testing onChange={onChange} name="test1" result={result1}></Testing>
        </div>
        <div label="Test 2">
          <Testing onChange={onChange} name="test2" result={result2}></Testing>
        </div>
        <div label="Test 3">
          <Testing onChange={onChange} name="test3" result={result3}></Testing>
        </div>
        <div label="Test 4">
          <Testing onChange={onChange} name="test4" result={result4}></Testing>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
