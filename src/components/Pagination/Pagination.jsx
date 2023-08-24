// import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';

function Paginations({setPages}) {
    const handleLoadMore = () => {
        setPages(s => s + 1);
      };
  return (
    <Button variant="secondary" onClick={handleLoadMore} type="button" >Load more</Button>
            // <button className="Button" onClick={handleLoadMore} type="button">Load more</button>
  )
    }


export default Paginations;
