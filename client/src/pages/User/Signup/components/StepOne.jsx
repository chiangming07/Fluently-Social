import { useState } from "react";
import { Input, Label, ErrorMessage, Button, Redirect } from "../../Style";

const StepOne = (props) => {
  const { setData, handleNextClick, handleError, error } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = () => {
    if (!username || !email || !password) {
      handleError("All fields are required.");
    } else {
      handleError("");
      setData({ username, email, password });
      handleNextClick("next-1");
    }
  };

  return (
    <>
      <Label>Username</Label>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        onClick={() => handleNext()}
        disabled={!username || !email || !password}
      >
        Next
      </Button>
      <Redirect to="/login">Already a member?</Redirect>
    </>
  );
};

export default StepOne;
