import { useState } from "react";

import { Wrapper, Form, Label, Input, Button, ErrorMessage } from "../Style";

import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: calc(100vh - 50px);
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 70%;
//   height: 70%;
//   margin-top: 50px;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 10px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
// `;
// const Label = styled.label`
//   font-size: 16px;
//   font-weight: bold;
// `;
// const Input = styled.input`
//   width: 40%;
//   padding: 10px;
//   margin: 15px 0;
//   border-radius: 5px;
//   border: none;
//   background-color: #f5f5f5;
// `;

// const Button = styled.span`
//   margin: 0 10px;
//   padding: 10px;
//   border-radius: 5px;
//   border: none;
//   background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#b0d7a1")};
//   color: ${({ disabled }) => (disabled ? "#9b9b9b" : "#4d4747")};
//   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
//   font-size: 16px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#628566")};
//     color: ${({ disabled }) => (disabled ? "#9b9b9b" : "white")};
//   }
// `;

// const ErrorMessage = styled.p`
//   padding: 10px;
//   border-radius: 5px;
//   /* background: #91d37769; */
//   color: #df1b1b;
// `;

const Signup = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const handleLastClick = () => {
    setError("");
    setStep(step - 1);
  };

  const handleNextClick = (buttonType) => {
    if (buttonType === "next-1") {
      setStep(step + 1);
    }
    if (buttonType === "next-2") {
      setStep(step + 1);
    }
  };

  const handleError = (e) => {
    if (e.response) {
      //   console.error("Error response:", e.response);
      setError(e.response.data.message);
    }
    // else if (e.request) {
    //   console.error("No response received:", e.request);
    // } else {
    //   console.error("Request error:", e.message);
    // }
  };

  return (
    <Wrapper>
      <Form>
        {step === 1 && (
          <StepOne
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
            handleLastClick={handleLastClick}
            handleNextClick={handleNextClick}
            handleError={handleError}
            error={error}
          />
        )}
        {/* {step === 3 && (
          <StepThree
            data={data}
            setData={setData}
            handleSubmitClick={handleSubmitClick}
            handleLastClick={handleLastClick}
            handleError={handleError}
            error={error}
          />
        )} */}
      </Form>
    </Wrapper>
  );
};

export default Signup;
export { Input, Label, ErrorMessage, Button };
