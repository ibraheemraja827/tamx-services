import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ServicesGrid from "./pages/ServicesGrid.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";

export default function App() {
  return (
    <div className="min-h-screen text-foreground">
      <ScrollToTop />
      <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/services" replace />} />
        <Route path="/services" element={<ServicesGrid />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<Navigate to="/services" replace />} />
      </Routes>
      <Footer />
      </ErrorBoundary>
    </div>
  );
}
