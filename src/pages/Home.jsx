/* eslint-disable react-hooks/exhaustive-deps */
// import { searchMovies } from "Fetch/fetch";

import { trendingMovies } from 'Fetch/fetch';
import { useStateContext } from 'GlobalContext/GlobalContext';
import Loader from 'components/Loader/Loader';
import SearchResults from 'components/SearchResults/SearchResults';
import { useEffect } from 'react';

export default function Home() {
  const { setSearchResult, status, setStatus} =
    useStateContext();

  const fetchMovies = async () => {
    setStatus('pending');
    try {
      const { results } = await trendingMovies();
      setSearchResult([...results]);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      // setErorrMessedge('Oops...something went wrong');
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
    return (
        <SearchResults title='Trending today'/>
    );
  }
  if (status === 'rejected') {
    return <div>oops</div>;
  }
}
