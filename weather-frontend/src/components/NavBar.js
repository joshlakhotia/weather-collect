import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

function NavBar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-info">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Weather Collect
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/forecasts">
                            Forecasts
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                    </Nav>
                    {auth.user ? (
                        <>
                            <span>Welcome {auth.user.username}!</span>
                            <Button
                                className="mx-4"
                                variant="dark"
                                size="sm"
                                onClick={() => {
                                    auth.logout();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Nav className="ml-auto">
                            <Button
                                variant="dark"
                                size="sm"
                                as={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                className="mx-2"
                                variant="dark"
                                size="sm"
                                as={Link}
                                to="/register"
                            >
                                Register
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
