import React from "react";
import { StyledInput } from "./StyledTextField";

const TextField = ({ type, id, name, onChange, placeholder, value }) => {
  return (
    <React.Fragment>
      <StyledInput
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      ></StyledInput>
    </React.Fragment>
  );
};
TextField.defaultProps = {
  type: "text"
};

export default React.memo(TextField);
