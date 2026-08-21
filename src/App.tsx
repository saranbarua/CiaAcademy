import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AdvisorModal } from './components/common/AdvisorModal';
import { BrochureModal } from './components/common/BrochureModal';
import { LiveChatWidget } from './components/common/LiveChatWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CategoryPage } from './pages/CategoryPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { StudyInUkPage } from './pages/StudyInUkPage';
import { InternationalStudentsPage } from './pages/InternationalStudentsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { StudentSupportPage } from './pages/StudentSupportPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <ModalProvider>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
          {/* Ambient Frosted Glass Glowing Blobs */}
          <div className="fixed -top-24 -right-24 w-[480px] h-[480px] bg-indigo-300/30 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="fixed top-1/3 -left-32 w-[400px] h-[400px] bg-violet-300/25 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="fixed bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none z-0" />

          <ScrollToTop />
          <TopBar />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:category" element={<CategoryPage />} />
              <Route path="/courses/:category/:slug" element={<CourseDetailPage />} />
              <Route path="/study-in-uk" element={<StudyInUkPage />} />
              <Route path="/international-students" element={<InternationalStudentsPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/student-support" element={<StudentSupportPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Interactive Global Elements */}
          <AdvisorModal />
          <BrochureModal />
          <LiveChatWidget />
        </div>
      </ModalProvider>
    </Router>
  );
}
