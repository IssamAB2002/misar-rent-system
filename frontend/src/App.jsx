import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Catalogue from './components/Catalogue';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import RentalPage from './pages/RentalPage';
import CarsPage from './pages/CarsPage';
import ContactPage from './pages/ContactPage';
import DebugPage from './pages/DebugPage';
import AdminPage from './pages/AdminPage';
import './index.css';
import './App.css';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Catalogue />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/voitures" element={<CarsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/rental/:uuid" element={<RentalPage />} />
    </Routes>
  );
}
