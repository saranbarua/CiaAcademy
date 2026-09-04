import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  // Video Modal
  isVideoModalOpen: boolean;
  videoUrl: string;
  openVideoModal: (url?: string) => void;
  closeVideoModal: () => void;

  // Search Modal
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  // Advisor Modal
  isAdvisorModalOpen: boolean;
  advisorCourseName?: string;
  openAdvisorModal: (courseName?: string) => void;
  closeAdvisorModal: () => void;

  // Brochure Modal
  isBrochureModalOpen: boolean;
  brochureCourseName?: string;
  openBrochureModal: (courseName?: string) => void;
  closeBrochureModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
  );

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [advisorCourseName, setAdvisorCourseName] = useState<
    string | undefined
  >(undefined);

  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [brochureCourseName, setBrochureCourseName] = useState<
    string | undefined
  >(undefined);

  const openVideoModal = (url?: string) => {
    if (url) setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openAdvisorModal = (courseName?: string) => {
    setAdvisorCourseName(courseName);
    setIsAdvisorModalOpen(true);
  };
  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
    setAdvisorCourseName(undefined);
  };

  const openBrochureModal = (courseName?: string) => {
    setBrochureCourseName(courseName);
    setIsBrochureModalOpen(true);
  };
  const closeBrochureModal = () => {
    setIsBrochureModalOpen(false);
    setBrochureCourseName(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isVideoModalOpen,
        videoUrl,
        openVideoModal,
        closeVideoModal,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        isAdvisorModalOpen,
        advisorCourseName,
        openAdvisorModal,
        closeAdvisorModal,
        isBrochureModalOpen,
        brochureCourseName,
        openBrochureModal,
        closeBrochureModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
