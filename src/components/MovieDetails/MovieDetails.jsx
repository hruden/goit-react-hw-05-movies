/* eslint-disable react-hooks/exhaustive-deps */
import Loader from 'components/Loader/Loader';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {
  AditionalTitle,
  GoBack,
  ImgCard,
  MovieDeteils,
  MovieGenders,
  MoviesName,
  StyledLink,
  Wraper,
} from './MovieDetails.styled';
import { moviesDeteils } from 'Fetch/fetch';
import { nanoid } from 'nanoid'
import { useStateContext } from 'GlobalContext/GlobalContext';
import Alert from 'react-bootstrap/Alert';

export default function MovieDetails() {
  const location = useLocation();
  const { movieId } = useParams();
  const [status, setStatus] = useState('idel')
  const [title, setTitle] = useState('');
  const [overview, srtOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [posterImg, setPosterImg] = useState('');
  const { erorrMessedge, setErorrMessedge } = useStateContext();

  const castId = nanoid()
  const reviewsId = nanoid()

  const fetchMoviesDeteils = async () => {
    setStatus('pending');
    try {
      const { title, overview, genres, vote_average, poster_path} =
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
      setErorrMessedge('Oops...something went wrong');
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoviesDeteils();
  }, []);
  
  const goBack = useRef(location.state)

  if (status === 'rejected') {
    return (
    <Alert variant="danger">
        <Alert.Heading>{erorrMessedge}</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>)
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <Container>
        <GoBack to={goBack.current?.from ? goBack.current.from : goBack.current = '/' }>
          Go back
        </GoBack>
        <Wraper>
          <Card>
            <ImgCard
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${posterImg}`}
              width={250}
              height={400}
            />
          </Card>
          <MovieDeteils>
            <MoviesName>{title}</MoviesName>
            <Card.Text>User score {userScore}</Card.Text>
            <Card.Title>Owervier</Card.Title>
            <Card.Text>{overview}</Card.Text>
            <Card.Title>Genres</Card.Title>
            <MovieGenders>
              {genres.map(({ name, id }) => {
                return <li key={id}><Card.Text>{name}</Card.Text></li>;
              })}
            </MovieGenders>
          </MovieDeteils>
        </Wraper>
        <AditionalTitle>Aditional informations</AditionalTitle>
        <ul>
          <li key={castId}>
            <StyledLink
              to={`/movies/${movieId}/cast`}
              state={{ from: location.pathname }}
            >
              Cast
            </StyledLink>
          </li>
          <li key={reviewsId}>
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
