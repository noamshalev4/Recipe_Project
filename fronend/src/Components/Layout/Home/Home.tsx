import { JSX, useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { FaUtensils } from 'react-icons/fa'; // Importing React Icon for a cooking theme
import logo from "../../../assets//home_english_no_kitchen.png";


export function Home(): JSX.Element | null {
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext)!;

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="Home">
            <Container className={`my-4 py-5 text-center rounded ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

                {/* Image */}
                <img
                    src={logo} // replace with your actual image path
                    alt="Reciply Banner"
                    // className="img-fluid rounded mb-4 shadow"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        maxHeight: '800px',
                    }}
                />

                {/* Button centered to the left of the image */}
                <div className="button-container" style={{ position: 'relative', top: '-50px' }}>
                    <Button
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
                        <FaUtensils style={{ marginRight: '10px' }} /> Let’s Start!
                    </Button>
                </div>

            </Container>
        </div>
    );
}
