/* eslint-disable react-hooks/exhaustive-deps */
import { movieCredits } from 'Fetch/fetch';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CastItem, CastList } from './Cast.styled';
import Alert from 'react-bootstrap/Alert';
import { useStateContext } from 'GlobalContext/GlobalContext';


export default function Cast() {
  const { erorrMessedge, setErorrMessedge } = useStateContext();
  const [status, setStatus] = useState('idel');
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const fetchCredits = async () => {
    setStatus('pending');
    try {
      const { cast } = await movieCredits({
        movieId,
      });
      setCast([...cast]);
      setStatus('resolved');
      if(!cast.length){
        setStatus('rejected');
        setErorrMessedge('Cast is not found');

      }
    } catch (error) {
      setStatus('rejected');
      setErorrMessedge('Oops...something went wrong, reload the page');
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCredits();
  }, []);

  if (status === 'rejected') {
    return <Alert variant='light'>{erorrMessedge}</Alert>
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      // <div>cast</div>
      <CastList>
        {cast.map(({ id, name, character, profile_path }) => {
          return (
            <CastItem key={id}>
              <img
              // src='../../img/photo.jpg'
                src={ profile_path ?(`https://image.tmdb.org/t/p/w500${profile_path}`):(`../img/photo.jpg`)}
                alt={name}
                width={100}
                height={160}
              />
              <div>
                <h5>{name}</h5>
                <p>Character: {character}</p>
              </div>
            </CastItem>
          );
        })}
      </CastList>
    );
  }
}
