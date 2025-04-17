import { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Routing.css";
import { Home } from "../Home/Home";
import { NotFound404 } from "../../NotFound404/NotFound404";
import { About } from "../About/About";
import { WizardForm } from "../../WizardForm/WizardForm";
import App from "../../../App";

// Import your pages here


export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Container className="py-4">
                <Routes>
                    {/* Default route - redirects to home */}
                    <Route path="/" element={<App/>} />
                    <Route index element={<Home/>} />

                    
                    {/* Main routes */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/wizard-form" element={<WizardForm />} />
                    <Route path="/404not-found" element={<NotFound404 />} />
                    
                    {/* Catch-all route for 404 errors */}
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </Container>
        </div>
    );
}