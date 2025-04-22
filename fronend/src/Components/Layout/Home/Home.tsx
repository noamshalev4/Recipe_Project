import { JSX, useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { FaUtensils } from 'react-icons/fa';
import logoEnglish from "../../../assets/home_english_no_kitchen.png";
import logoHebrew from "../../../assets/home_hebrow_no_kitchen_no_text.png"; // Create a Hebrew version of the image
import { useNavigate } from "react-router-dom";
import './Home.css';

export function Home(): JSX.Element | null {
    const { t, i18n } = useTranslation(); // Get i18n instance as well
    const { isDarkMode } = useContext(ThemeContext)!;
    const [isMounted, setIsMounted] = useState(false);
    const navigation = useNavigate();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Select appropriate logo based on language
    const logo = i18n.language === 'he' ? logoHebrew : logoEnglish;

    if (!isMounted) return null;

    return (
        <div className={`Home ${i18n.language === 'he' ? 'rtl' : 'ltr'}`}>
            <Container className={`Background my-4 py-5 text-center rounded ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

                {/* Image */}
                <img
                    src={logo}
                    alt={t('home.banner.alt')}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        maxHeight: '800px',
                        marginRight: i18n.language === 'he' ? "0px" : "120px",
                        marginLeft: i18n.language === 'he' ? "120px" : "0px", // Adjust margins for RTL
                    }}
                />

                {/* Button centered to the left of the image */}
                <div className="button-container" style={{ position: 'relative', top: '0px' }}>
                    <Button
                        onClick={() => navigation("/wizard-form")}
                        variant="success"
                        size="lg"
                        className="px-5 py-4 fs-2 fw-bold shadow rounded-pill d-flex align-items-center justify-content-center"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            borderRadius: '30px',
                            minWidth: '300px',
                            maxWidth: '500px',
                            background: 'linear-gradient(145deg, #2C71C1,rgb(58, 133, 219))',
                            color: '#fff',
                            fontWeight: '700',
                            padding: '20px',
                            fontSize: '1.5rem'
                        }}
                    >
                        <FaUtensils style={{ 
                            marginRight: i18n.language === 'he' ? '0px' : '10px',
                            marginLeft: i18n.language === 'he' ? '10px' : '0px'
                        }} /> 
                        {t('button.start')}
                    </Button>
                </div>
            </Container>
        </div>
    );
}