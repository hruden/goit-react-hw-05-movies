// import Pagination from 'react-bootstrap/Pagination';

function Paginations({setPages}) {
    const handleLoadMore = () => {
        setPages(s => s + 1);
      };
  return (
            <button className="Button" onClick={handleLoadMore} type="button">Load more</button>
  )
    }


export default Paginations;
