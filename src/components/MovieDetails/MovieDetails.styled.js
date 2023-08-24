import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export const StyledLink = styled(NavLink)`
  color: gray;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: large;
  display: block;
  width: 200px;
  &:hover{
    color: orange;
  }

  &.active {
    color: orange;
  }
`;
export const GoBack = styled(NavLink)`
display: block;
  color: gray;
  text-decoration: none;
  padding: 10px;

&:hover {
  color: orange;
}
`;
export const Wraper = styled(Container)`
  display: flex;
  gap: 30px;
  padding: 0;
  margin-bottom: 30px;
`;
export const MoviesName = styled(Card.Title)`
  font-size: xx-large;
`
export const ImgCard = styled(Card.Img)`
  width: 200px;
`
export const MovieDeteils = styled(Card.Body)`
  max-width: 600px;
`
export const MovieGenders = styled.ul`
  display: flex;
  gap: 30px;
`
export const AditionalTitle = styled.h3`
  font-size: large;
`
// Card.Title