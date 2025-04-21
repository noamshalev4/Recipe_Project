import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../Context/ThemeContext/ThemeContext';
import { motion } from 'framer-motion';
import { GiCook, GiCookingPot, GiNotebook } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import chefImage from '../../../assets/chef_figure.png'; // Make sure to use the correct path
import './About.css';

export function About(): React.JSX.Element {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext)!;

  useEffect(() => {
    document.title = 'About Us - Reciply';
  }, []);

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
    <div className={`about-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chef-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-4"
              >
                <h1 className="display-4 fw-bold">About Reciply</h1>
                <p className="lead mt-3">
                  Where culinary inspiration meets practical guidance
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
                  src={chefImage}
                  alt="Chef Mascot"
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
                  <h2 className="mb-4">Our Story</h2>
                  <p className="chef-story">
                    Hello there! I'm Noam Shalev, a passionate sous-chef with years of experience in professional kitchens. Throughout my culinary journey, I've witnessed firsthand the transformative power of home cooking—and the frustration that can come with it.
                  </p>
                  <p className="chef-story">
                    Like many culinary professionals, I remember the early days of my career when creating even simple dishes seemed daunting. That feeling of standing in the kitchen, ingredients at hand, but unsure how to proceed—it's a universal experience that connects home cooks everywhere.
                  </p>
                  <p className="chef-story">
                    This is why I created Reciply. I wanted to bridge the gap between having ingredients and enjoying a delicious home-cooked meal. This platform is designed to eliminate the guesswork from cooking by providing personalized recipe recommendations based on what's already in your kitchen, your available time, and your skill level.
                  </p>
                  <p className="chef-story">
                    At Reciply, we believe that the most satisfying culinary experiences come from creative exploration. Our step-by-step guidance empowers you to experiment with confidence, transforming everyday ingredients into extraordinary meals. Because in the end, the best dishes come from that playful, adventurous spirit in the kitchen.
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
              <h2 className="text-center mb-4">How Reciply Works</h2>
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
                  <h3 className="h4">Input Your Ingredients</h3>
                  <p>
                    Tell us what ingredients you have on hand in your kitchen pantry.
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
                  <h3 className="h4">Set Your Parameters</h3>
                  <p>
                    Specify how much time you have and your preferred difficulty level.
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
                  <h3 className="h4">Discover Recipes</h3>
                  <p>
                    Get personalized recipe suggestions that match your criteria with step-by-step instructions.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <div className={`mission-statement p-4 rounded-3 ${isDarkMode ? 'bg-dark-subtle' : 'bg-light-subtle'}`}>
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
      </Container>
    </div>
  );
}