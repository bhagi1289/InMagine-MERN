import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/actions';
import HTTPClient from '../HTTPClient';

function NavigationBar() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  function handleLogout(){
        //axios.get(`${BASE_URL}/auth/logout`, options)
        HTTPClient.get('/auth/logout').then(()=>{
          dispatch(logout())

        });
  }
  return (

    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Restaurant</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>

        {loggedIn && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}

      </Container>
    </Navbar>
  </>
    
  );
}

export default NavigationBar;