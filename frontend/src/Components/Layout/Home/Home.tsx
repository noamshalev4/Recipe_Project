import { JSX, useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { FaUtensils } from 'react-icons/fa';
import logoHebrew from "../../../assets/home_hebrow_no_kitchen_no_text.png";
import { useNavigate } from "react-router-dom";
import './Home.css';

export function Home(): JSX.Element | null {
    const { t, i18n } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext)!;
    const [isMounted, setIsMounted] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Set initial direction
        document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';

        // Add listener for language changes
        const handleLanguageChange = (lng: string) => {
            document.dir = lng === 'he' ? 'rtl' : 'ltr';
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const logo = logoHebrew;

    if (!isMounted) return null;

    return (
        <div className={`Home ${i18n.language === 'he' ? 'rtl' : 'ltr'}`}>
            <Container className={`Background my-4 py-5 text-center rounded ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

                {/* Image with consistent positioning */}
                <div className="image-container position-relative">
                    <img
                        src={logo}
                        alt={t('home.banner.alt')}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            maxHeight: '800px',
                            display: 'block',
                            margin: '0 auto', // Center the image base
                            transform: i18n.language === 'he'
                                ? 'translate(-57px, 23px)' // Move right in Hebrew (RTL moves opposite)
                                : 'translate(-57px, 23px)', // Move left in English
                            position: 'relative',
                        }}
                    />

                    <div
                        className="text-overlay"
                        style={{
                            position: 'absolute',
                            top: '11%',
                            left: '30.3%', // Fixed position for both languages
                            width: '361px', // 9.5cm converted to pixels
                            height: '260px', // 7.5cm converted to pixels
                            textAlign: i18n.language === 'he' ? 'right' : 'left',
                            color: isDarkMode ? '#f8f9fa' : '#333',
                            backgroundColor: 'transparent', // Fully transparent background
                            overflow: 'auto', // Allow scrolling if content overflows
                            padding: '0', // Remove padding to maximize space
                            zIndex: 2,
                            borderRadius: '10px',
                        }}
                    >
                        <h2 className="mb-2" style={{
                            fontWeight: 'bold',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)', // Smaller font size
                            color: isDarkMode ? '#5594e2' : '#2C71C1'
                        }}>
                            {i18n.language === 'he'
                                ? <>ברוכים הבאים ל־<span style={{ fontFamily: '"Arial", sans-serif' }}>Reciply</span> – המקום שבו הרעב פוגש יצירתיות!</>
                                : <>Welcome to Reciply – where hunger meets creativity!</>
                            }
                        </h2>
                        <p style={{
                            fontSize: i18n.language === 'he' 
                                ? 'clamp(0.65rem, 1.5vw, 0.85rem)' 
                                : 'clamp(0.6rem, 1.5vw, 0.8rem)', // Different font size based on language
                            lineHeight: '1.4',
                            textAlign: i18n.language === 'he' ? 'right' : 'left',
                            margin: 0,
                            color: '#333',
                        }}>
                            {i18n.language === 'he'
                                ? <>
                                    בין אם אתם סטודנטים, פרילנסרים, או כאלה שהמקרר שלהם נראה כמו תערוכת אמנות מינימליסטית – האתר הזה בשבילכם.<br />
                                    כאן תמצאו מתכונים טעימים ופשוטים, עם מה שכבר יש בבית.<br />
                                    לא צריך להיות שף, ולא צריך רשימת קניות <br /><span style={{ fontFamily: '"Arial", sans-serif' }}>שגדולה מה - To Do List שלכם</span> – פשוט תבחרו מה שיש, ואנחנו נטפל בשאר.<br />
                                    המתכונים מותאמים לחיים האמיתיים: מהירים, חכמים, וידידותיים לתקציב.<br />
                                    אז קדימה – הכניסו את המרכיבים שיש לכם בבית, ו־<span style={{ fontFamily: '"Arial", sans-serif' }}>Reciply</span> תפתיע אתכם עם משהו טעים במיוחד.
                                </>
                                : <>
                                    Whether you're a student, a freelancer, or your fridge looks like a minimalist art exhibit – this site is for you.<br />
                                    Here, you'll find tasty, simple recipes using only what you already have at home.<br />
                                    No need to be a chef or make a shopping list longer than your To-Do List – just pick what you've got, and we'll take it from there.<br />
                                    Our recipes are made for real life: quick, clever, and budget-friendly.<br />
                                    So go ahead – enter the ingredients you've got lying around, and let Reciply surprise you with something delicious.
                                </>
                            }
                        </p>
                    </div>
                </div>

                {/* Button centered with the image */}
                <div className="button-container" style={{ position: 'relative', marginTop: '20px' }}>
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