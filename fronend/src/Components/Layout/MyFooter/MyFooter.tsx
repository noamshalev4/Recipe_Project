import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa';
import { useState, useEffect, JSX } from 'react';
import { useTheme } from '../../../Context/ThemeContext/ThemeContext';
import './MyFooter.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function MyFooter(): JSX.Element {
  const { isDarkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState<string>("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Get localized date format based on current language
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString(i18n.language === 'he' ? 'he-IL' : 'en-US', options));
  }, [i18n.language]); // Re-run when language changes

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
    <footer className={`my-5 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center text-lg-start`} 
            dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
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
                <h3 className="h4 mb-3">{t('footer.ourMission')}</h3>
                <p className="mb-0">
                  {t('footer.missionStatement')}
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
            <p>{t('footer.copyright', { date: currentDate })}</p>
          </Col>
        </Row>

        {/* Second Row: Centered Social Icons and Back to Top Icon */}
        <Row className="py-2">
          <Col className="d-flex justify-content-center align-items-center">
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title={t('footer.social.facebook')}>
                <FaFacebook size={24} />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" title={t('footer.social.whatsapp')}>
                <FaWhatsapp size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title={t('footer.social.instagram')}>
                <FaInstagram size={24} />
              </a>
              <a href="mailto:contact@reciply.com" target="_blank" rel="noopener noreferrer" title={t('footer.social.email')}>
                <FaEnvelope size={24} />
              </a>
              {/* Back to Top Icon */}
              <FaArrowUp
                size={30}
                className="scroll-to-top-icon"
                onClick={scrollToTop}
                title={t('footer.backToTop')}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}