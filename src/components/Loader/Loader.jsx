import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
      <Button variant="light" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="md"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
  );
}

export default Loader;