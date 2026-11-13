import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";

export default function App() {
  return (
    <div className="min-h-screen text-foreground">
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="*" element={<Navigate to="/services/product-design" replace />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}
