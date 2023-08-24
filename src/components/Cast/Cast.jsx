/* eslint-disable react-hooks/exhaustive-deps */
import { movieCredits } from 'Fetch/fetch';
import { useStateContext } from 'GlobalContext/GlobalContext';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Cast() {
  const { status, setStatus } = useStateContext();
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  
  const fetchCredits = async (movieId) => {
    setStatus('pending');
    try {
      const { cast } = await movieCredits({
        movieId,
      });
      setCast([...cast]);
      setStatus('resolved');
      console.log(cast)
    } catch (error) {
      setStatus('rejected');
      // setErorrMessedge('Oops...something went wrong');
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchCredits(movieId)
  },[movieId, fetchCredits])

  if(status==='rejected'){
    return <div>oops</div>
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
  return (
    // <div>cast</div>
    <ul>
      {cast.map(({ id, name, character, profile_path }) => {
        return (
          <li key={id}>
            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} />
            <h5>{name}</h5>
            <p>Character: {character}</p>
          </li>
        );
      })}
    </ul>
  );
}
}