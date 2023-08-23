/* eslint-disable react-hooks/exhaustive-deps */
import { searchMovies } from 'Fetch/fetch';
import { useStateContext } from 'GlobalContext/GlobalContext';
import Loader from 'components/Loader/Loader';
import Paginations from 'components/Pagination/Pagination';
import SearchResults from 'components/SearchResults/SearchResults';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [q, setQ] = useState('');
  const [pages, setPages] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const { searchResult, setSearchResult, status, setStatus } =
    useStateContext();

  const handleChange = ({ target }) => {
    setQ(target.value);
  };
  const handlSubmit = e => {
    e.preventDefault();
    setTotalPage(0);
    setPages(1);
    setSearchResult([]);
    setSearchQuery(q);
    reset();
  };
  const reset = () => {
    setQ('');
  };
  const fetchMovies = async () => {
    setStatus('pending');
    try {
      const { results, page, total_pages } = await searchMovies({
        searchQuery, pages
      });
      setSearchResult(s => [...s, ...results]);
      setPages(page);
      setTotalPage(total_pages);
      setStatus('resolved');
      // if (!searchResult.length) {
      //   return console.log('Sorry, there are no movies matching your search query. Please try again.')

        // setErorrMessedge(
        //   'Sorry, there are no images matching your search query. Please try again.'
        // );
      // }
    } catch (error) {
      setStatus('rejected');
      // setErorrMessedge('Oops...something went wrong');
      console.log(error);
    }
  };
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchMovies();
  }, [searchQuery]);
  useEffect(() => {
    if (pages===1) {
      return;
    }
    fetchMovies();
  }, [pages]);
  const isShowLoadeMore = !pages || totalPage > pages;
  if(status === 'rejected'){
    return <div>oopps</div>
  }
  if (status === 'pending') {
    return <Loader />;
  }
  const cliakSearch = !q
  return (
    <>
      <Form onSubmit={handlSubmit}>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" id="button-addon1" type="submit" disabled={cliakSearch? true: false}>
            Search
          </Button>
          <Form.Control
            value={q}
            onChange={handleChange}
            placeholder="Search for a movie"
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      {(status === 'resolved')?(
      <>
        <SearchResults title={`Faund results ${Number(searchResult.length)}`}/>
        {isShowLoadeMore && <Paginations setPages={setPages} />}
      </>
      ): (status === 'pending')}
    </>
  );


}

