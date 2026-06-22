"use client";

import React, { useState } from "react";
import Checkoutp1 from "../../features/components/cart/Checkoutp1";
import Checkoutp2 from "../../features/components/cart/Checkoutp2";
import Checkoutp3 from "../../features/components/cart/Checkoutp3";

export default function CheckoutRoute() {

  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Dynamically render the component based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Checkoutp1 onNext={nextStep} />;
      case 2:
        return <Checkoutp2 onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Checkoutp3 onBack={prevStep} />;
      default:
        return <Checkoutp1 onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Optional: Add a simple step indicator/progress bar here */}
      <div className="max-w-md mx-auto mb-6 text-center text-sm text-gray-400">
        Step {step} of 3
      </div>

      {renderStep()}
    </div>
  );
}