import { Navigate, Route, Routes } from 'react-router-dom';
import BookVisitPage from './pages/BookVisitPage';
import ConfirmationPage from './pages/confirmationpage';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/index.html" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login.html" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register.html" element={<RegisterPage />} />
      <Route path="/book-visit" element={<BookVisitPage />} />
      <Route path="/book-visit.html" element={<BookVisitPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/how-it-works.html" element={<HowItWorksPage />} />
      <Route path="/confirmation/:id" element={<ConfirmationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
