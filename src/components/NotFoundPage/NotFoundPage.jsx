import Alert from 'react-bootstrap/Alert';
import { NavLink } from 'react-router-dom';

export default function NotFoundPage(){
    return(
        <Alert variant='danger'>
        We did not find the page you are looking for. Try
        <NavLink to="/"> this one</NavLink>.
      </Alert>
    )
}