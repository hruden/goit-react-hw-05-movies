/* eslint-disable react-hooks/exhaustive-deps */
import Loader from 'components/Loader/Loader';
import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { StyledLink } from './MovieDetails.styled';
import { moviesDeteils } from 'Fetch/fetch';
import { useStateContext } from 'GlobalContext/GlobalContext';

export default function MovieDetails() {
  const location = useLocation();
  const { movieId } = useParams();
  const { status, setStatus } = useStateContext();
  const [title, setTitle] = useState('');
  const [overview, srtOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [posterImg, setPosterImg] = useState('');

  const fetchMoviesDeteils = async () => {
    setStatus('pending');
    try {
      const { title, overview, genres, vote_average, poster_path } =
        await moviesDeteils({
          movieId,
        });
      setTitle(title);
      srtOverview(overview);
      setGenres([...genres]);
      setUserScore(vote_average);
      setPosterImg(poster_path);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoviesDeteils();
  }, []);
  if(status==='rejected'){
    return <div>oops</div>
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <Container>
        <NavLink to={location.state?.from ? location.state.from : '/'}>
          Go back
        </NavLink>
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${posterImg}`}
              width={200}
              height={300}
            />
          </Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>User score {userScore}</Card.Text>
            <Card.Title>Owervier</Card.Title>
            <Card.Text>{overview}</Card.Text>
            <Card.Title>Genres</Card.Title>
            {genres.map(({ name, id }) => {
              return <Card.Text key={id}>{name}</Card.Text>;
            })}
          </Card.Body>
        </div>
        <h3>Aditional informations</h3>
        <ul>
          <li>
            {' '}
            <StyledLink
              to={`/movies/${movieId}/cast`}
              state={{ from: location.pathname }}
            >
              Cast
            </StyledLink>
          </li>
          <li>
            {' '}
            <StyledLink
              to={`/movies/${movieId}/reviews`}
              state={{ from: location.pathname }}
            >
              Reviews
            </StyledLink>
          </li>
        </ul>

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Container>
    );
  }
}
