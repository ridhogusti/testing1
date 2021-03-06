import styled from "styled-components";

const StyledInput = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  &:focus {
    border: 3px solid #555;
  }
`;

export { StyledInput };
