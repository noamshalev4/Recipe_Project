import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ThemeContext } from '../../../Context/ThemeContext/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import './Contact.css';

export function Contact(): React.JSX.Element {
  const { isDarkMode } = useContext(ThemeContext)!;

  useEffect(() => {
    document.title = 'Contact Us - Reciply';
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={`contact-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">Get in Touch</h1>
              <p className="lead mb-0">
                Have a question about a recipe? Want to share your culinary success story?
                We'd love to hear from you!
              </p>
            </Col>
          </Row>
        </motion.div>

        <Row className="g-4">
          <Col lg={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`border-0 shadow-sm h-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-4">
                  <h2 className="h3 mb-4">Send Us a Message</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your name"
                        className={isDarkMode ? 'bg-dark-subtle text-light' : ''}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="your@email.com"
                        className={isDarkMode ? 'bg-dark-subtle text-light' : ''}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="What's this about?"
                        className={isDarkMode ? 'bg-dark-subtle text-light' : ''}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Your message"
                        className={isDarkMode ? 'bg-dark-subtle text-light' : ''}
                        required
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      className="btn-gradient"
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`border-0 shadow-sm mb-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-4">
                  <h2 className="h3 mb-4">Contact Information</h2>
                  
                  <div className="contact-info">
                    <div className="d-flex align-items-center mb-4">
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <Mail size={24} />
                      </div>
                      <div className="ms-3">
                        <h3 className="h5 mb-1">Email</h3>
                        <p className="mb-0">noamsbest@gmail.com</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <Phone size={24} />
                      </div>
                      <div className="ms-3">
                        <h3 className="h5 mb-1">Phone</h3>
                        <p className="mb-0">+972 050-1234567</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <MapPin size={24} />
                      </div>
                      <div className="ms-3">
                        <h3 className="h5 mb-1">Office</h3>
                        <p className="mb-0">123 Culinary Street<br />Foodie City, FC 12345</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className={`border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-5">
                  <h2 className="h3 mb-4">Follow Us</h2>
                  <div className="d-flex gap-3">
                    <a href="https://www.instagram.com/noamsbest/" className={`social-link ${isDarkMode ? 'social-dark' : 'social-light'}`}>
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/noamsbest/" className={`social-link ${isDarkMode ? 'social-dark' : 'social-light'}`}>
                      <Facebook size={24} />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}