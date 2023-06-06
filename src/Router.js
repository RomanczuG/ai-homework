import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Tool from "./pages/Tool";
import ToolTesting from "./pages/ToolTesting";
import { Navbar } from "./components/Navbar";
import { FAQ } from "./pages/FAQ";
import { HowItWorks } from "./pages/HowItWorks";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Footer } from "./components/Footer";
import { LoginPage } from "./pages/LoginPage";
import { AuthenticatedPage } from "./pages/AuthenticatedPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { ChatPage } from "./pages/ChatPage";

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tool" element={<Tool />} />
      <Route path="/tool-testing" element={<ToolTesting />} />
      {/* <Route path="/blog" element={<Blog />} /> */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/authenticated" element={<PrivateRoute></PrivateRoute>} /> */}
      <PrivateRoute path="/authenticated" component={AuthenticatedPage} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default Router;
