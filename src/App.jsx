import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Breadcrumb } from './components/Breadcrumb';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { Soleus } from './pages/Soleus';
import { AdvisoryBoard } from './pages/AdvisoryBoard';
import { PCODPage, DiabetesPage } from './pages/Disorders';
import { DisorderPage } from './pages/DisorderPage';
import { ProtocolPage } from './pages/ProtocolPage';
import { ProgramPage } from './pages/ProgramPage';
import { AboutPage } from './pages/AboutPage';
import { WOWAssessmentPage } from './pages/WOWAssessmentPage';
import { NotFound } from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <div className="min-h-screen bg-white font-sans text-gray-900">
          <Toaster position="top-center" richColors />
          <Navbar />
          <Breadcrumb />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:programId" element={<ProgramPage />} />
              <Route path="/soleus" element={<Soleus />} />
              <Route path="/advisory-board" element={<AdvisoryBoard />} />
              <Route path="/disorders" element={<NotFound />} />
              <Route path="/disorders/:disorderId" element={<DisorderPage />} />
              <Route path="/pcod" element={<PCODPage />} />
              <Route path="/diabetes" element={<DiabetesPage />} />
              <Route path="/protocols/:protocolId" element={<ProtocolPage />} />
              <Route path="/wellness-verticals" element={<AboutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/wow-assessment" element={<WOWAssessmentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
