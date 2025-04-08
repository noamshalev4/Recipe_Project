// src/App.tsx
import { ThemeProvider } from './Context/ThemeContext/ThemeContext';
import { MyNavbar } from './Components/Layout/MyNavbar/MyNavbar';
import { Home } from './Components/Layout/Home/Home';
import './Components/i18n/i18n'; // Your i18n setup
import { MyFooter } from './Components/Layout/MyFooter/MyFooter';

function App() {
    return (
        <ThemeProvider>
            <MyNavbar />
            <Home />
            <MyFooter/>
        </ThemeProvider>
    );
}

export default App;
