import { useStateContext } from 'GlobalContext/GlobalContext';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom';
import { StyledLink } from './SearchResults.styled';
import Card from 'react-bootstrap/Card';

export default function SearchResults({title}) {
  const { searchResult } = useStateContext();

  const location = useLocation();

    return (
      <ListGroup variant="flush">
        <Card.Title>{title}</Card.Title>
        {searchResult &&
          searchResult.map(({ title, id }) => {
            return (
              <ListGroup.Item key={id}>
                <StyledLink
                  to={`/movies/${id}`}
                  state={{ from: location }}
                >
                  {title}
                </StyledLink>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  }


