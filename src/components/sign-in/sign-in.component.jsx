import { useState } from "react";
import "./sign-in.styles.scss";

import { FormInput } from "../form-input/form-input.component";
import { Button } from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInPageWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const restFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;
    if (!password || !email) {
      return;
    }
    try {
      const response = await signInPageWithEmailAndPassword(email, password);
      console.log(response);

      restFormFields();
    } catch (error) {
      console.log("error signing in with email and password ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit"> Sign In </Button>
          <Button typ="button" buttonType="google" onClick={signInWithGoogle}>
            {" "}
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
