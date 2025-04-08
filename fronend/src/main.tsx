import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
      <App />
    </BrowserRouter>
)
