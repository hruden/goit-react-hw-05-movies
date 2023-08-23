import { useStateContext } from 'GlobalContext/GlobalContext';
import Loader from 'components/Loader/Loader';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom';
import { StyledLink } from './SearchResults.styled';
import Card from 'react-bootstrap/Card';

export default function SearchResults({title}) {
  const { searchResult, status } = useStateContext();
  const location = useLocation();

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <ListGroup variant="flush">
        <Card.Title>{title}</Card.Title>
        {searchResult &&
          searchResult.map(({ title, id }) => {
            return (
              <ListGroup.Item key={id}>
                <StyledLink
                  to={`/movies/${id}`}
                  state={{ from: location.pathname }}
                >
                  {title}
                </StyledLink>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  }
  if (status === 'rejected') {
    return <div>oops</div>;
  }
}
