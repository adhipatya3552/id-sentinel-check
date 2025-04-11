
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { verifyId, VerificationResult } from "@/utils/idDatabase";
import { toast } from "@/hooks/use-toast";

interface VerificationSectionProps {
  onReset: () => void;
}

const VerificationSection: React.FC<VerificationSectionProps> = ({ onReset }) => {
  const [id, setId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on input when component loads
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Handle fake ID detection - close the website after a delay
    if (result && !result.isValid) {
      toast({
        variant: "destructive",
        title: "Fake ID Detected",
        description: result.message,
      });
      
      // Mark as closing
      setIsClosing(true);
      
      // Close the website after 3 seconds (simulate closing)
      const timer = setTimeout(() => {
        document.body.classList.add("animate-fade-out");
        setTimeout(() => {
          // In a real scenario, we might redirect or do something else
          document.body.innerHTML = "<div class='flex items-center justify-center h-screen bg-black text-white text-xl'>Website closed due to fake ID detection.</div>";
        }, 1000);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleVerify = () => {
    if (!id.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an ID to verify",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API delay
    setTimeout(() => {
      const verificationResult = verifyId(id.trim());
      setResult(verificationResult);
      setIsVerifying(false);
      
      if (verificationResult.isValid) {
        toast({
          title: "Verification Successful",
          description: verificationResult.message,
        });
      }
    }, 1500);
  };

  return (
    <section className="section bg-secondary">
      <div className="container mx-auto max-w-md animate-fade-in">
        <Card className={`w-full shadow-lg ${isClosing ? 'animate-shake' : 'animate-scale'}`}>
          <CardHeader>
            <CardTitle className="text-2xl text-center gradient-text">ID Verification</CardTitle>
            <CardDescription className="text-center">Enter the ID you want to verify</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  ref={inputRef}
                  type="text"
                  id="id-input"
                  placeholder="Enter ID (e.g., ID123456)"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="verification-input"
                  disabled={isVerifying || isClosing}
                />
              </div>
              
              {result && (
                <div className={`p-4 rounded-lg ${
                  result.isValid 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200 animate-pulse'
                }`}>
                  <div className="flex items-center">
                    {result.isValid ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                    )}
                    <p>{result.message}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={isVerifying || isClosing}
            >
              Back
            </Button>
            
            <Button
              onClick={handleVerify}
              disabled={isVerifying || isClosing || !id.trim()}
              className="bg-primary text-white"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-rotate" />
                  Verifying...
                </>
              ) : (
                'Verify ID'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {isClosing && (
          <div className="mt-6 text-center animate-fade-in text-red-600 font-semibold">
            Closing website in a few seconds...
          </div>
        )}
      </div>
    </section>
  );
};

export default VerificationSection;
