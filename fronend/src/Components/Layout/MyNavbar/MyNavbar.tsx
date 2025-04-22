import { JSX, useContext } from "react";
import { Container, Nav, Navbar, Button, ButtonGroup } from "react-bootstrap";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import logo from "../../../assets/logo.png";
import "./MyNavbar.css";

export function MyNavbar(): JSX.Element {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;
    const { t, i18n } = useTranslation(); // Add t function here

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
                        <Nav.Link href="/home">{t('home')}</Nav.Link>
                        <Nav.Link href="/about">{t('about')}</Nav.Link>
                        <Nav.Link href="/contact">{t('contact')}</Nav.Link>

                        {/* Dark/Light Mode & Language Buttons */}
                        <ButtonGroup className="ms-3 d-flex align-items-center">
                            <Button
                                variant="outline-secondary"
                                onClick={toggleTheme}
                                title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                            <Button
                                variant="outline-info"
                                onClick={() => i18n.changeLanguage(i18n.language === "en" ? "he" : "en")}
                                title={i18n.language === "en" ? t('language.hebrew') : t('language.english')}
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