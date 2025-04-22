import { JSX } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import "./NotFound404.css";
import chefImage from "../../assets/404_v3.png";

export function NotFound404(): JSX.Element {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`NotFound404 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Background wrapper for the image */}
            <div className="background-wrapper">
                <Image src={chefImage} alt="Page not found background" />
            </div>
            
            <Container className="content-container">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col className="mt-5 ms-2" xs={12} md={10} lg={8}>
                        <div className="text-center transparent-container">
                            <h2 className="mb-3 subtitle">Oops! This recipe is still in the oven...</h2>
                            <p className="mb-4 message-text">We couldn't find the page you were looking for. Maybe it got too spicy and ran off?</p>
                            <Link to="/">
                                <Button variant={isDarkMode ? "dark" : "light"} size="lg" className="px-4 py-2 mb-4 home-button">
                                    Back to Home Kitchen
                                </Button>
                            </Link>
                            <p className="humor">Even the best chefs burn a few pages now and then!</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}