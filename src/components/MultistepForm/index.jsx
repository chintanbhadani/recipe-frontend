import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      <form>
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} />}
        <button>prev</button>
        <button>next</button>
      </form>
    </>
  );
};

export default MultiStepForm;
