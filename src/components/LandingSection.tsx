
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Lock } from "lucide-react";

interface LandingSectionProps {
  onGetStarted: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="section bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="mb-8 text-white p-4 rounded-full bg-white/10 animate-scale">
            <Shield size={64} className="animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            ID Sentinel
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl text-white/90">
            Verify the authenticity of IDs instantly with our secure verification system.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 animate-slide-down"
          >
            Get Started
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
            <FeatureCard 
              icon={<CheckCircle size={24} />}
              title="Fast Verification"
              description="Verify IDs in seconds with our advanced system"
            />
            <FeatureCard 
              icon={<Lock size={24} />}
              title="Secure Process"
              description="Your data is encrypted and protected at all times"
            />
            <FeatureCard 
              icon={<Shield size={24} />}
              title="Reliable Results"
              description="Get accurate verification results you can trust"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
      <div className="text-white mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

export default LandingSection;
