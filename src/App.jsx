import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/services/product-design" replace />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<Navigate to="/services/product-design" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
