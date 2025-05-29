import { JSX, useContext, useEffect } from "react";
import { Container, Nav, Navbar, Button, ButtonGroup } from "react-bootstrap";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import { Link, useLocation } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import "./MyNavbar.css";

export function MyNavbar(): JSX.Element {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'he';
    const location = useLocation();

    // Update document direction attribute whenever language changes
    useEffect(() => {
        console.log("isRTL: " + isRTL)
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.dir = isRTL ? 'rtl' : 'ltr';
    }, [isRTL]);

    const changeLanguage = () => {
        const newLang = i18n.language === "en" ? "he" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <Navbar expand="lg" bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} className="shadow-sm">
            <Container fluid="lg" className={isRTL ? 'navbar-rtl' : 'navbar-ltr'}>
                {/* Logo - left in English, right in Hebrew */}
                <div className="navbar-brand-container">
                    <Navbar.Brand
                        as={Link}
                        to="/home"
                    >
                        <Image
                            src={logo}
                            alt="Logo"
                            width={100}
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </div>

                {/* Toggle button - positioned based on language */}
                <Navbar.Toggle
                    aria-controls="main-navbar"
                    className={`navbar-toggler-${isRTL ? 'rtl' : 'ltr'}`}
                />

                {/* Nav Links - always centered */}
                <Navbar.Collapse id="main-navbar" className="justify-content-center">
                    <Nav className="text-center">
                        <Nav.Link
                            as={Link}
                            to="/home"
                            active={location.pathname === '/home' || location.pathname === '/'}
                        >
                            {t('navbar.home')}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            active={location.pathname === '/about'}
                        >
                            {t('navbar.about')}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/contact"
                            active={location.pathname === '/contact'}
                        >
                            {t('navbar.contact')}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/recipes"
                            active={location.pathname === '/recipes'}
                        >
                            {t('navbar.myRecipes')}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {/* Controls - right in English, left in Hebrew */}
                <div className="controls-container">
                    {/* For both languages, use a proper btn-group without margin between buttons */}
                    <ButtonGroup className="button-controls">
                        {isRTL ? (
                            // Hebrew mode: language button on left, theme button on right
                            <>
                                <Button
                                    variant="outline-secondary"
                                    onClick={toggleTheme}
                                    title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
                                    className="theme-button"
                                >
                                    {isDarkMode ? <FaSun /> : <FaMoon />}
                                </Button>
                                <Button
                                    variant="outline-info"
                                    onClick={changeLanguage}
                                    title={t('language.english')}
                                    className="language-button"
                                >
                                    <FaGlobe className="ms-1" />
                                    English
                                </Button>
                            </>
                        ) : (
                            // English mode: theme button on left, language button on right
                            <>
                                <Button
                                    variant="outline-secondary"
                                    onClick={toggleTheme}
                                    title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
                                    className="theme-button"
                                >
                                    {isDarkMode ? <FaSun /> : <FaMoon />}
                                </Button>
                                <Button
                                    variant="outline-info"
                                    onClick={changeLanguage}
                                    title={t('language.hebrew')}
                                    className="language-button"
                                >
                                    <FaGlobe className="me-1" />
                                    עברית
                                </Button>
                            </>
                        )}
                    </ButtonGroup>
                </div>
            </Container>
        </Navbar>
    );
}