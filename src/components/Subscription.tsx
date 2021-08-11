import React, { useState, ChangeEvent, FormEvent } from 'react';

const Subscription: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [validationClass, setValidationClass] = useState<string>('');

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmailInput(emailInput);
  };

  const handleSaveEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const savedSubscriptions: string[] = JSON.parse(
      localStorage.getItem('subscriptions') || '[]'
    );
    const subscriptionIsExist = savedSubscriptions.findIndex(
      (email: string) => email === emailInput
    );

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (subscriptionIsExist < 0 && emailRegex.test(emailInput)) {
      savedSubscriptions.push(emailInput);
      localStorage.setItem('subscriptions', JSON.stringify(savedSubscriptions));
      setValidationClass('is-valid');
    } else {
      setValidationClass('is-invalid');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title fw-bold">Subscribe</div>
        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSaveEmail}
        >
          <input
            type="email"
            className={`form-control ${validationClass}`}
            placeholder="Your email address"
            value={emailInput}
            onChange={onChangeEmailInput}
            required
          />
          <div className="valid-feedback">Thank you for your interest!</div>
          <div className="invalid-feedback">That email is not valid.</div>
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscription;
