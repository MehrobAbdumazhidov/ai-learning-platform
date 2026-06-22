import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import { ThemeProvider } from './context/ThemeContext';
import { EngagementProvider } from './context/EngagementContext';

export default function App() {
  return (
    <ThemeProvider>
      <EngagementProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
          </Route>
        </Routes>
      </EngagementProvider>
    </ThemeProvider>
  );
}
