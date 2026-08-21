import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, closeVideoModal, videoUrl } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoModal();
    };
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoModalOpen, closeVideoModal]);

  return (
    <AnimatePresence>
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Promotional Academy Video"
          >
            {/* Header / Close button */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-200">Apex Academy Campus & Training Tour</span>
              </div>
              <button
                id="close-video-modal-btn"
                onClick={closeVideoModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={videoUrl}
                  title="Academy Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                    <Play className="w-8 h-8 text-cyan-400 ml-1" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">Welcome to Apex Academy UK</h3>
                  <p className="text-sm text-slate-300 max-w-md">
                    Explore our modern training suites in London & Birmingham, interactive SIA physical intervention labs, and international higher education pathways.
                  </p>
                </div>
              )}
            </div>

            {/* Footer information */}
            <div className="px-5 py-3 bg-slate-950 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>Accredited by Highfield, Pearson, SIA & CITB</span>
              <span className="text-indigo-400 font-medium">Admissions Hotline: +44 (0) 20 8123 4567</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
