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
import { PrivateRoutes } from "./components/PrivateRoutes";
import { ChatPage } from "./pages/ChatPage";
import { Dashboard } from "./pages/DashboardPage";
import { useLocation } from "react-router-dom";
import { DashboardNavbar } from "./components/DashboardNavbar";
import { Account } from "./pages/AccountPage";
import { Modal } from "./utils/DashboardUtils";
import { useState } from "react";
import { Upgrade } from "./components/Upgrade";
const Layout = ({children}) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");

  const [upgradeModal, setUpgradeModal] = useState(false);

  const toggleModal = () => setUpgradeModal(!upgradeModal);
  return (
    <>
      {isDashboard ? <DashboardNavbar onUpgradeClick={toggleModal}/> : <Navbar />}
      <Modal isOpen={upgradeModal} setIsOpen={setUpgradeModal}>
        
         
             <Upgrade />
             
        
      </Modal>

      {children}
      {!isDashboard && <Footer />}
    </>
  );
};

const Router = () => {

  return (
    <BrowserRouter>
    <Layout>
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
        <Route element={<PrivateRoutes />}>
          <Route path="/auth" element={<AuthenticatedPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/account" element={<Account />} />
        </Route>
        <Route path="/dashboard/chat" element={<ChatPage />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
