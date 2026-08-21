import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ShieldCheck,
  HardHat,
  Briefcase,
  HeartHandshake,
  Languages,
  Award,
  Globe2,
  BookOpen,
  ArrowRight,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useModal } from '../../context/ModalContext';
import { categoriesData } from '../../data/categoriesData';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { openSearchModal, openAdvisorModal } = useModal();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  // Detect scroll to toggle glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-500" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-teal-500" />;
      case 'Languages': return <Languages className="w-5 h-5 text-cyan-500" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-500" />;
      default: return <GraduationCap className="w-5 h-5 text-indigo-500" />;
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses', hasMegaMenu: true },
    { name: 'Study in UK', path: '/study-in-uk' },
    { name: 'International', path: '/international-students' },
    {
      name: 'Resources',
      hasDropdown: true,
      children: [
        { name: 'Admissions & Intakes', path: '/admissions', desc: 'Entry requirements & payment plans' },
        { name: 'Student Support', path: '/student-support', desc: 'Career clinic, CV & pastoral support' },
        { name: 'Blog & UK Guides', path: '/blog', desc: 'Industry insights & visa news' },
        { name: 'Frequently Asked Questions', path: '/faq', desc: 'Quick answers for applicants' }
      ]
    },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg shadow-indigo-950/5 py-3'
          : 'backdrop-blur-xl bg-white/70 dark:bg-[#0B0F19]/75 border-b border-slate-200/50 dark:border-white/10 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            id="navbar-brand-logo"
            aria-label="Apex Academy Home"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-indigo-950 dark:text-white uppercase block leading-tight font-display">
                APEX <span className="text-indigo-600 dark:text-indigo-400">ACADEMY</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 dark:text-slate-400 block -mt-0.5">
                UK Professional Education
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('courses')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={link.path}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        location.pathname.startsWith('/courses')
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-slate-800/80 shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/60 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === 'courses' ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                        }`}
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === 'courses' && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[780px] backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-white/80 dark:border-white/10 p-6 z-50 overflow-hidden"
                        >
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Accredited Qualifications Directory
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Regulated qualifications designed for fast employment & degree progression
                              </p>
                            </div>
                            <Link
                              to="/courses"
                              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              <span>Browse All Courses</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {categoriesData.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/courses/${cat.slug}`}
                                className="p-3 rounded-2xl hover:bg-white/80 dark:hover:bg-slate-800/80 border border-transparent hover:border-white/80 dark:hover:border-slate-700 transition-all group/cat text-left block"
                              >
                                <div className="flex items-center space-x-2.5 mb-1.5">
                                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover/cat:scale-110 transition-transform">
                                    {getCategoryIcon(cat.iconName)}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover/cat:text-indigo-600 dark:group-hover/cat:text-indigo-400">
                                      {cat.name}
                                    </h4>
                                    <span className="text-[11px] text-slate-400">
                                      {cat.courseCount} Qualifications
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                  {cat.popularCert}
                                </p>
                              </Link>
                            ))}
                          </div>

                          {/* Quick Banner footer */}
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/40 dark:to-violet-950/40 -mx-6 -mb-6 p-4 px-6 text-xs text-slate-600 dark:text-slate-300">
                            <span className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                              Need custom corporate or group training?
                            </span>
                            <button
                              onClick={() => openAdvisorModal('Corporate / Group Training')}
                              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                            >
                              Contact Enterprise Desk →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('resources')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        location.pathname.startsWith('/blog') ||
                        location.pathname.startsWith('/faq') ||
                        location.pathname.startsWith('/admissions') ||
                        location.pathname.startsWith('/student-support')
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-slate-800/80 shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/60 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === 'resources' ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'resources' && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-72 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-white/80 dark:border-white/10 p-2 z-50"
                        >
                          {link.children?.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="p-2.5 rounded-2xl hover:bg-white/80 dark:hover:bg-slate-800 transition-colors block text-left group"
                            >
                              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {sub.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {sub.desc}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-slate-800/80 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA Button */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Quick Search Button */}
            <button
              onClick={openSearchModal}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800 backdrop-blur-sm transition-colors border border-transparent hover:border-slate-200/60"
              title="Search qualifications (Ctrl+K)"
              aria-label="Search"
              id="nav-search-button"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800 backdrop-blur-sm transition-colors border border-transparent hover:border-slate-200/60"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Apply Now Primary CTA */}
            <Link
              to="/apply"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              id="nav-apply-btn"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Mobile Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-1.5">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                About Academy
              </Link>

              {/* Mobile Courses Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === 'courses' ? null : 'courses'
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <span>Courses Directory</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'courses' ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'courses' && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-800/40 rounded-xl my-1">
                    <Link
                      to="/courses"
                      className="block px-3 py-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                      All Courses Overview →
                    </Link>
                    {categoriesData.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/courses/${cat.slug}`}
                        className="block px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/study-in-uk"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Study in the UK
              </Link>

              <Link
                to="/international-students"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                International Students & Visa
              </Link>

              {/* Mobile Resources Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === 'resources' ? null : 'resources'
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <span>Student Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'resources' ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'resources' && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-800/40 rounded-xl my-1">
                    <Link
                      to="/admissions"
                      className="block px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                    >
                      Admissions & Intakes
                    </Link>
                    <Link
                      to="/student-support"
                      className="block px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                    >
                      Student Support & Career Clinic
                    </Link>
                    <Link
                      to="/blog"
                      className="block px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                    >
                      Blog & Industry Guides
                    </Link>
                    <Link
                      to="/faq"
                      className="block px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                    >
                      Frequently Asked Questions
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Contact & Campus
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <Link
                to="/apply"
                className="w-full flex items-center justify-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-700 shadow-md shadow-indigo-600/30"
              >
                Apply Online Now
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdvisorModal();
                }}
                className="w-full flex items-center justify-center py-2.5 rounded-xl font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 gap-2"
              >
                <PhoneCall className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Talk to an Advisor</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
