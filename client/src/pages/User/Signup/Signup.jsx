import { useState } from "react";

import { Wrapper, Form } from "../Style";

import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const handleBackClick = () => {
    setError("");
    setStep(step - 1);
  };

  const handleNextClick = () => {
    setError("");
    setStep(step + 1);
  };

  const handleError = (e) => {
    if (e.response) {
      setError(e.response.data.message);
    }
  };

  return (
    <Wrapper>
      <Form>
        {step === 1 && (
          <StepOne
            data={data}
            setData={setData}
            handleNextClick={handleNextClick}
            handleError={handleError}
            error={error}
          />
        )}
        {step === 2 && (
          <StepTwo
            data={data}
            setData={setData}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            handleError={handleError}
            error={error}
          />
        )}
      </Form>
    </Wrapper>
  );
};

export default Signup;
