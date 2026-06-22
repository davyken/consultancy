import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ITServices from './pages/ITServices';
import RealEstate from './pages/RealEstate';
import Team from './pages/Team';
import Projects from './pages/Projects';
import Partners from './pages/Partners';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/it-services" element={<ITServices />} />
                <Route path="/real-estate" element={<RealEstate />} />
                <Route path="/team" element={<Team />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
