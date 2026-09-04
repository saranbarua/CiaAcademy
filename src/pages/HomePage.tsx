import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Hero } from "../components/home/Hero";
import { TrustPartners } from "../components/home/TrustPartners";
import { AnimatedStats } from "../components/home/AnimatedStats";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedCoursesSlider } from "../components/home/FeaturedCoursesSlider";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { StudyUKSection } from "../components/home/StudyUKSection";
import { InternationalStudentsSection } from "../components/home/InternationalStudentsSection";
import { CareerPathways } from "../components/home/CareerPathways";
import { StudentSuccess } from "../components/home/StudentSuccess";
import { GoogleReviewProof } from "../components/home/GoogleReviewProof";
import { HowItWorks } from "../components/home/HowItWorks";
import { NewsBlogSection } from "../components/home/NewsBlogSection";
import { FAQSection } from "../components/home/FAQSection";
import { CTASection } from "../components/home/CTASection";

export const HomePage: React.FC = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Apex Academy of Professional Education",
    url: "https://apexacademy.ac.uk",
    logo: "https://apexacademy.ac.uk/logo.png",
    description:
      "Premier UK education and training academy providing accredited SIA, CSCS, Health & Social Care, Business, and University Pathway qualifications.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 Commercial Road",
      addressLocality: "London",
      postalCode: "E1 1LA",
      addressCountry: "GB",
    },
    telephone: "+44-20-8123-4567",
    sameAs: [
      "https://facebook.com/apexacademyuk",
      "https://linkedin.com/school/apexacademyuk",
      "https://instagram.com/apexacademyuk",
    ],
  };

  return (
    <>
      <SEOHead
        title="Apex Academy | UK Accredited SIA, CSCS, Care & University Pathways"
        description="Earn UK accredited qualifications in Security (SIA), Construction (CSCS), Health & Social Care, and Higher Education Bachelor/Master Degree Top-Up pathways at Apex Academy London."
        keywords="Apex Academy, SIA course London, CSCS green card, health social care NVQ, UK university pathway, top up degree UK, study in UK international students"
        canonicalUrl="https://apexacademy.ac.uk"
        schemaJson={homeSchema}
      />

      <main className="min-h-screen">
        <Hero />
        <TrustPartners />
        <AnimatedStats />
        <CategoryGrid />
        <FeaturedCoursesSlider />
        <WhyChooseUs />
        <StudyUKSection />
        <InternationalStudentsSection />
        <CareerPathways />
        <StudentSuccess />
        <GoogleReviewProof />
        <HowItWorks />
        <NewsBlogSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
};
