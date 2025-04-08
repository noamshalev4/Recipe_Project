import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "features": "Features",
      "pricing": "Pricing",
      "footer": "© 2025 Reciply, All Rights Reserved.",
      "backToTop": "Back to Top",
      // Add more keys for translation as needed
    },
  },
  he: {
    translation: {
      "home": "דף הבית",
      "features": "תכונות",
      "pricing": "תמחור",
      "footer": "© 2025 רסיפלי, כל הזכויות שמורות.",
      "backToTop": "חזרה למעלה",
      // Add more keys for Hebrew translation as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for React as it escapes by default
  },
});

export default i18n;
