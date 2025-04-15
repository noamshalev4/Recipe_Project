// src/App.tsx
import { ThemeProvider } from './Context/ThemeContext/ThemeContext';
import { MyNavbar } from './Components/Layout/MyNavbar/MyNavbar';
import './Components/i18n/i18n'; // Your i18n setup
import { MyFooter } from './Components/Layout/MyFooter/MyFooter';
import { Routing } from './Components/Layout/Routing/Routing';

function App() {
    return (
        <ThemeProvider>
            <MyNavbar />
            <Routing />
            <MyFooter />
        </ThemeProvider>

    );
}

export default App;
