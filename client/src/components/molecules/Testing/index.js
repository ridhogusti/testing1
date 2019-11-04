import React from "react";
import TextField from "../../atoms/TextField";
import { StyledResult } from "./StyledTesting";

const Testing = ({ onChange, result, name }) => {
  return (
    <React.Fragment>
      <TextField
        onChange={e => onChange(name, e.target.value)}
        placeholder="Input your number"
        type="number"
      ></TextField>
      <StyledResult dangerouslySetInnerHTML={result}></StyledResult>
    </React.Fragment>
  );
};

export default Testing;
