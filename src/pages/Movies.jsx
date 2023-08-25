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
import Alert from 'react-bootstrap/Alert';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idel');
  const [q, setQ] = useState('');
  const [pages, setPages] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  const { searchResult, setSearchResult, erorrMessedge, setErorrMessedge, setSearchParams } =
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
        searchQuery,
        pages,
      });
      setSearchResult(s => [...s, ...results]);
      setPages(page);
      setTotalPage(total_pages);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setErorrMessedge('Oops...something went wrong');
      console.log(error);
    }
  };
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setSearchParams({'search': searchQuery})


    fetchMovies();
  }, [searchQuery]);
  useEffect(() => {
    if (pages === 1) {
      return;
    }
    fetchMovies();
  }, [pages]);
  const isShowLoadeMore = !pages || totalPage > pages;

  const cliakSearch = !q;
  return (
    <>
      <Form onSubmit={handlSubmit}>
        <InputGroup className="mb-3">
          <Button
            variant="outline-secondary"
            id="button-addon1"
            type="submit"
            disabled={cliakSearch ? true : false}
          >
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
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <>
          <SearchResults 
            title={`Faund results ${Number(searchResult.length)}`}
          />
          {isShowLoadeMore && <Paginations setPages={setPages} />}
        </>
      )}{' '}
      {status === 'rejected' && (
        <Alert variant="danger">
          <Alert.Heading>{erorrMessedge}</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      )}
    </>
  );
}
