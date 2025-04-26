import { JSX, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import "./NotFound404.css";
import chefImage from "../../assets/404_v3.png";

export function NotFound404(): JSX.Element {
    const { isDarkMode } = useTheme();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'he';
    
    useEffect(() => {
        document.title = t('notFound.pageTitle') || 'Page Not Found';
    }, [t]);
    
    return (
        <div className={`NotFound404 ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Background wrapper for the image */}
            <div className="background-wrapper">
                <Image src={chefImage} alt={t('notFound.imageAlt') || "Page not found background"} />
            </div>
            
            <Container className="content-container" dir={isRTL ? 'rtl' : 'ltr'}>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col className={`mt-5 ${isRTL ? 'me-2' : 'ms-2'}`} xs={12} md={10} lg={8}>
                        <div className="text-center transparent-container">
                            <h2 className="mb-3 subtitle">{t('notFound.title')}</h2>
                            <p className="mb-4 message-text">{t('notFound.message')}</p>
                            <Link to="/">
                                <Button variant={isDarkMode ? "dark" : "light"} size="lg" className="px-4 py-2 mb-4 home-button">
                                    {t('notFound.button')}
                                </Button>
                            </Link>
                            <p className="humor">{t('notFound.humor')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}