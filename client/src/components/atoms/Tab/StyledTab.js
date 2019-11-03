import styled, { css } from "styled-components";

const StyledTabListItem = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: white;
  text-transform: uppercase;
  opacity: 0.7;
  height: -webkit-fill-available;
  align-items: center;
  display: flex;
  ${({ active }) => {
    if (active) {
      return css`
        border-bottom: 2px solid white;
        opacity: 1;
      `;
    }
  }};
`;

export { StyledTabListItem };
