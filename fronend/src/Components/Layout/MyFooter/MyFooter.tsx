import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa'; // Importing icons
import { useState, useEffect, JSX } from 'react';
import { useTheme } from '../../../Context/ThemeContext/ThemeContext';  // <-- Import useTheme
import './MyFooter.css';
import { motion } from 'framer-motion';

export function MyFooter(): JSX.Element {
  const { isDarkMode, toggleTheme } = useTheme();  // <-- Consume the theme context
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
  const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
        },
      },
    };

  return (
    <footer className={`my-5 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center text-lg-start`}>
      <Container fluid>
        {/* First Row: Centered Text */}
        <Row>
          <Col lg={10} className="mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                <h3 className="h4 mb-3">Our Mission</h3>
                <p className="mb-0">
                  To empower home cooks of all skill levels to create delicious, satisfying meals with the ingredients they already have, making cooking an accessible and joyful experience for everyone.
                </p>
                <div className="mt-3">
                  <FaHeart className="text-danger" size={24} />
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
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
