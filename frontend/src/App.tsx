// src/App.tsx
import { ThemeProvider } from './Context/ThemeContext/ThemeContext';
import { MyNavbar } from './Components/Layout/MyNavbar/MyNavbar';
import './Components/i18n/i18n'; // Your i18n setup
import { MyFooter } from './Components/Layout/MyFooter/MyFooter';
import { Routing } from './Components/Layout/Routing/Routing';
import { RecipeProvider } from './Context/RecipeContext/RecipyContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Set direction based on current language
        const isRTL = i18n.language === 'he';
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.dir = isRTL ? 'rtl' : 'ltr';
    }, [i18n.language]);
    
    return (
        <ThemeProvider>
            <RecipeProvider>
                <MyNavbar />
                <Routing />
                <MyFooter />
            </RecipeProvider>
        </ThemeProvider>

    );
}

export default App;
