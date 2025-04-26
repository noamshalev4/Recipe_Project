import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ThemeContext } from '../../../Context/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import './Contact.css';

export function Contact(): React.JSX.Element {
  const { isDarkMode } = useContext(ThemeContext)!;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  useEffect(() => {
    document.title = t('language-contact.pageTitle');
  }, [t]);

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
    alert(t('language-contact.form.submitSuccess'));
  };

  return (
    <div className={`contact-page ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isRTL ? 'rtl' : 'ltr'}`}>
      <Container className="py-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">{t('language-contact.title')}</h1>
              <p className="lead mb-0">
                {t('language-contact.subtitle')}
              </p>
            </Col>
          </Row>
        </motion.div>

        <Row className="g-4">
          <Col lg={6} className={isRTL ? 'order-lg-2' : ''}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`border-0 shadow-sm h-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-4">
                  <h2 className={`h3 mb-4 ${isRTL ? 'text-end' : ''}`}>{t('language-contact.form.title')}</h2>
                  <Form onSubmit={handleSubmit} className={isRTL ? 'text-end' : ''}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('language-contact.form.name')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('language-contact.form.namePlaceholder')}
                        className={`${isDarkMode ? 'bg-dark-subtle text-light' : ''} ${isRTL ? 'text-end' : ''}`}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('language-contact.form.email')}</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t('language-contact.form.emailPlaceholder')}
                        className={`${isDarkMode ? 'bg-dark-subtle text-light' : ''} ${isRTL ? 'text-end' : ''}`}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('language-contact.form.subject')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('language-contact.form.subjectPlaceholder')}
                        className={`${isDarkMode ? 'bg-dark-subtle text-light' : ''} ${isRTL ? 'text-end' : ''}`}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>{t('language-contact.form.message')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder={t('language-contact.form.messagePlaceholder')}
                        className={`${isDarkMode ? 'bg-dark-subtle text-light' : ''} ${isRTL ? 'text-end' : ''}`}
                        required
                      />
                    </Form.Group>

                    <div className={`d-flex ${isRTL ? 'justify-content-center' : 'justify-content-center'}`}>
                      <Button
                        type="submit"
                        className="btn-gradient"
                        size="lg"
                      >
                        {t('language-contact.form.submit')}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col lg={6} className={isRTL ? 'order-lg-1' : ''}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className={`border-0 shadow-sm mb-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-4">
                  <h2 className={`h3 mb-4 ${isRTL ? 'text-end' : ''}`}>{t('language-contact.info.title')}</h2>

                  <div className="contact-info">
                    <div className={`d-flex align-items-center mb-4 ${isRTL ? 'flex-row-reverse text-end' : ''}`}>
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <Mail size={24} />
                      </div>
                      <div className={isRTL ? 'me-3' : 'ms-3'}>
                        <h3 className="h5 mb-1">{t('language-contact.info.email.label')}</h3>
                        <p className="mb-0">noamsbest@gmail.com</p>
                      </div>
                    </div>

                    <div className={`d-flex align-items-center mb-4 ${isRTL ? 'flex-row-reverse text-end' : ''}`}>
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <Phone size={24} />
                      </div>
                      <div className={isRTL ? 'me-3' : 'ms-3'}>
                        <h3 className="h5 mb-1">{t('language-contact.info.phone.label')}</h3>
                        <p className="mb-0">{t('language-contact.info.phone.value')}</p>
                      </div>
                    </div>

                    <div className={`d-flex align-items-center ${isRTL ? 'flex-row-reverse text-end' : ''}`}>
                      <div className={`icon-container ${isDarkMode ? 'icon-dark' : 'icon-light'}`}>
                        <MapPin size={24} />
                      </div>
                      <div className={isRTL ? 'me-3' : 'ms-3'}>
                        <h3 className="h5 mb-1">{t('language-contact.info.office.label')}</h3>
                        <p className="mb-0">{t('language-contact.info.office.line1')}<br />{t('language-contact.info.office.line2')}</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className={`border-0 shadow-sm ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Card.Body className="p-5">
                  <h2 className={`h3 mb-4 ${isRTL ? 'text-end' : ''}`}>{t('language-contact.social.title')}</h2>
                  <div
                    className={`d-flex ${isRTL ? 'flex-row-reverse justify-content-start' : 'justify-content-start'}`}
                    style={{ gap: '1rem' }}
                  >
                    <a href="https://www.instagram.com/noamsbest/" className={`social-link ${isDarkMode ? 'social-dark' : 'social-light'}`} title={t('language-contact.social.instagram')}>
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/noamsbest/" className={`social-link ${isDarkMode ? 'social-dark' : 'social-light'}`} title={t('language-contact.social.facebook')}>
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