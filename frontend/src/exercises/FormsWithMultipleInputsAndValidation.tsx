import { useState } from "react";
import type { FormData } from "../types/FormData";
import "./FormsWithMultipleInputsAndValidation.css";

/*
Practise:
* Managing multiple form fields with useState.

* Handling form submission.

* Adding basic client-side validation.

* Showing error messages inline.
*/

function validate(values: FormData) {
  const errors: Partial<FormData> = {};
  let hasErrors = false;

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.includes("@")) {
    errors.email = "Email must contain @";
  }

  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  for (const errorKey in errors) {
    if (errors[errorKey as keyof FormData]) {
      hasErrors = true;
      break;
    }
  }

  return hasErrors ? errors : undefined;
}

export const FormsWithMultipleInputsAndValidation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setError((prevValues) => {
      return {
        ...prevValues,
        [name]: "",
      };
    });

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(false);

    // const formInputs = e.currentTarget.elements;

    // const name = (formInputs["name" as never] as HTMLInputElement).value;
    // const email = (formInputs["email" as never] as HTMLInputElement).value;
    // const password = (formInputs["password" as never] as HTMLInputElement).value;

    // const validationErrors = validate({ name, email, password });

    const validationErrors = validate(formData);

    if (validationErrors) {
      setError(validationErrors);
      return;
    }

    setIsSubmitted(true);
  }

  const isFormValid = Object.values(error).every((value) => !value);

  return (
    <div className="l-form-container">
      <h2 className="c-form-container-title">Sign Up</h2>

      {isSubmitted ? (
        <p className="c-success-message">Form submitted successfully</p>
      ) : (
        <form className="c-form" onSubmit={onFormSubmit} noValidate>
          <div className="c-form__field">
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              name="name"
              id="userName"
              value={formData.name}
              aria-invalid={!!error.name}
              onChange={handleChange}
              className={`c-form__input${error.name ? " c-form__input--error" : ""}`}
            />
            {error.name && <p className="c-error-message">{error.name}</p>}
          </div>

          <div className="c-form__field">
            <label htmlFor="userEmail">Email:</label>
            <input
              type="email"
              name="email"
              id="userEmail"
              value={formData.email}
              aria-invalid={!!error.email}
              onChange={handleChange}
              className={`c-form__input${error.email ? " c-form__input--error" : ""}`}
            />
            {error.email && <p className="c-error-message">{error.email}</p>}
          </div>

          <div className="c-form__field">
            <label htmlFor="userPassword">Password:</label>
            <input
              type="password"
              name="password"
              id="userPassword"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!error.password}
              className={`c-form__input${error.password ? " c-form__input--error" : ""}`}
            />
            <p className="c-input-counter">{`password length is ${formData.password.length} characters.`}</p>
            {error.password && <p className="c-error-message">{error.password}</p>}
          </div>
          <div>
            <button type="submit" disabled={!isFormValid} className="c-form__button">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormsWithMultipleInputsAndValidation;
