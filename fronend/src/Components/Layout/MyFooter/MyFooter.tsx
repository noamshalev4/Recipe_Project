import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa'; // Importing icons
import { useState, useEffect, JSX } from 'react';
import './MyFooter.css';

export function MyFooter(): JSX.Element {
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        // Get the current date in the full format (Day, Month Date, Year)
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('en-US', options));
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="bg-light text-center text-lg-start">
            <Container fluid>
                {/* First Row: Centered Text */}
                <Row className="py-4">
                    <Col className="d-flex justify-content-center">
                        <p>© {currentDate} Reciply, All Rights Reserved.</p>
                    </Col>
                </Row>

                {/* Second Row: Centered Social Icons and Back to Top Icon */}
                <Row className="py-2">
                    <Col className="d-flex justify-content-center align-items-center">
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={24} />
                            </a>
                            <a href="mailto:contact@reciply.com" target="_blank" rel="noopener noreferrer">
                                <FaEnvelope size={24} />
                            </a>
                            {/* Back to Top Icon */}
                            <FaArrowUp 
                                size={30} 
                                className="scroll-to-top-icon"
                                onClick={scrollToTop} 
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
