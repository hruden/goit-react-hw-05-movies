import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const StyledLink = styled(NavLink)`
  color: gray;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 15px;
  
  &.active {
    color: orange;
  }
`;