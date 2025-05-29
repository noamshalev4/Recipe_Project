import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../Context/ThemeContext/ThemeContext';
import { motion } from 'framer-motion';
import { GiCook, GiCookingPot, GiNotebook } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import chefImage from '../../../assets/chef_figure2.png'; // Used for English
import chefImage2 from '../../../assets/chef_figure3.png'; // Used for Hebrew
import './About.css';

export function About(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext)!;
  const isRTL = i18n.language === 'he';

  useEffect(() => {
    document.title = t('language-about.pageTitle');
  }, [t]);

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
    <div className={`about-page ${isDarkMode ? 'dark-mode' : 'light-mode'} ${i18n.language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="chef-banner">
        <Container>
          <Row className="px-5 align-items-center">
            <Col md={6} className={`text-center ${isRTL ? 'text-md-end' : 'text-md-start'}`}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-4"
              >
                <h1 className="display-4 fw-bold">{t('language-about.title')}</h1>
                <p className="lead mt-3">
                  {t('language-about.subtitle')}
                </p>
              </motion.div>
            </Col>
            <Col md={6} className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="chef-image-container"
              >
                <img
                  src={isRTL ? chefImage2 : chefImage}
                  alt={t('language-about.chefImageAlt')}
                  className="chef-image img-fluid"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-4 p-md-5">
                  <h2 className="mb-4">{t('language-about.ourStory.title')}</h2>
                  <p className="chef-story">
                    {t('language-about.ourStory.paragraph1')}
                  </p>
                  <p className="chef-story">
                    {t('language-about.ourStory.paragraph2')}
                  </p>
                  <p className="chef-story">
                    {t('language-about.ourStory.paragraph3')}
                  </p>
                  <p className="chef-story">
                    {t('language-about.ourStory.paragraph4')}
                    <p className="chef-story">
                      {t('language-about.ourStory.paragraph4')}
                    </p>
                    <p className="chef-story chef-motto chef-highlight">
                      {t('language-about.ourStory.paragraph5')}
                    </p>
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-center mb-4">{t('language-about.howItWorks.title')}</h2>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`h-100 border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className={`icon-container mb-3 ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                    <GiCook size={50} />
                  </div>
                  <h3 className="h4">{t('language-about.howItWorks.step1.title')}</h3>
                  <p>
                    {t('language-about.howItWorks.step1.description')}
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Card className={`h-100 border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className={`icon-container mb-3 ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                    <GiCookingPot size={50} />
                  </div>
                  <h3 className="h4">{t('language-about.howItWorks.step2.title')}</h3>
                  <p>
                    {t('language-about.howItWorks.step2.description')}
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Card className={`h-100 border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className={`icon-container mb-3 ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                    <GiNotebook size={50} />
                  </div>
                  <h3 className="h4">{t('language-about.howItWorks.step3.title')}</h3>
                  <p>
                    {t('language-about.howItWorks.step3.description')}
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}