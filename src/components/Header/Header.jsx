import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StyledLink } from './Header.styled';

function Header() {
  const location = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <StyledLink to="/" state={{ from: location.pathname }}>Home</StyledLink>
              <StyledLink to="/movies" state={{ from: location.pathname }}>Movies</StyledLink>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
