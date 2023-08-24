/* eslint-disable react-hooks/exhaustive-deps */
// import { searchMovies } from "Fetch/fetch";

import { trendingMovies } from 'Fetch/fetch';
import { useStateContext } from 'GlobalContext/GlobalContext';
import Loader from 'components/Loader/Loader';
import SearchResults from 'components/SearchResults/SearchResults';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';


export default function Home() {
  const { setSearchResult } = useStateContext();
  const [status, setStatus] = useState('idel');
  const { erorrMessedge, setErorrMessedge } = useStateContext();


  const fetchMovies = async () => {
    setStatus('pending');
    try {
      const { results } = await trendingMovies();
      setSearchResult([...results]);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setErorrMessedge('Oops...something went wrong');
      console.log(error);
    }
  };
  useEffect(() => {
    setSearchResult([]);
    fetchMovies();
    return () => {
      setSearchResult([]);
    };
  }, []);
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return <SearchResults title="Trending today" />;
  }
  if (status === 'rejected') {
    return (
      <Alert variant="danger">
          <Alert.Heading>{erorrMessedge}</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>)  }
}
