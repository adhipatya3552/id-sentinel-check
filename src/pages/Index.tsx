
import { useState, useRef, useEffect } from "react";
import LandingSection from "@/components/LandingSection";
import VerificationSection from "@/components/VerificationSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<"landing" | "verification">("landing");
  const verificationRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setCurrentSection("verification");
  };

  const handleReset = () => {
    setCurrentSection("landing");
  };

  // Scroll to verification section when it becomes active
  useEffect(() => {
    if (currentSection === "verification" && verificationRef.current) {
      setTimeout(() => {
        verificationRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [currentSection]);

  return (
    <div className="min-h-screen bg-background">
      {/* Landing Section */}
      <LandingSection onGetStarted={handleGetStarted} />
      
      {/* Verification Section - conditionally rendered */}
      {currentSection === "verification" && (
        <div ref={verificationRef}>
          <VerificationSection onReset={handleReset} />
        </div>
      )}
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-background">
        <p>© 2025 ID Sentinel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
