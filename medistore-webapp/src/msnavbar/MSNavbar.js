import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MediStoreLogo from '../resources/medistore-logo.png'
import './MSNavbar.css';

function MSNavbar() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <a href="#">
                    <img className="medistore-logo" src={MediStoreLogo} alt="MediStore Logo"></img>
                </a>
                <Container fluid>
                    <Navbar.Brand href="#">MediStore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '10rem' }}
                            navbarScroll
                        >
                            <Nav.Link href="/medications">Medications</Nav.Link>
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        </Nav>
                        <Nav className="dropdown-right">
                            <NavDropdown title="About" id="navbarScrollingDropdown" className="justify-content-end" align="end">
                                <NavDropdown.Item href="/about">About</NavDropdown.Item>
                                <NavDropdown.Item href="/meettheteam">
                                    Meet the Team
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://github.com/lfoley7/MediStore">
                                    View the Github Repo
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MSNavbar;