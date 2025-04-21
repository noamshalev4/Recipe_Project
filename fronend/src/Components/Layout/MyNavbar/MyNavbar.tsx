// src/components/Layout/MyNavbar.tsx
import "./MyNavbar.css";
import { JSX, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, ButtonGroup } from "react-bootstrap";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import logo from "../../../assets/logo.png";

export function MyNavbar(): JSX.Element {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;
    const { i18n } = useTranslation();

    return (
        <Navbar expand="lg" bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} className="shadow-sm">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={100}
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                        <NavDropdown title="More" id="nav-dropdown">
                            <NavDropdown.Item href="#action1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action2">Another Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dark/Light Mode & Language Buttons */}
                        <ButtonGroup className="ms-3 d-flex align-items-center">
                            <Button
                                variant="outline-secondary"
                                onClick={toggleTheme}
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                            <Button
                                variant="outline-info"
                                onClick={() => i18n.changeLanguage(i18n.language === "en" ? "he" : "en")}
                                title={i18n.language === "en" ? "Switch to Hebrew" : "Switch to English"}
                            >
                                <FaGlobe className="me-1" />
                                {i18n.language === "en" ? "עברית" : "English"}
                            </Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
