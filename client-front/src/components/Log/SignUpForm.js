import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [lastName, setlastName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const lastNameError = document.querySelector('.lastName.error');
    const firstNameError = document.querySelector('.firstName.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');

    passwordConfirmError.textContent = '';
    termsError.textContent = '';

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.textContent =
          'Les mots de passe ne correspondent pas';

      if (!terms.checked)
        termsError.textContent = 'Veuillez valider les conditions générales';
    } 
    else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/auth/signUp`,
        data: {
          lastName,
          firstName,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            lastNameError.textContent = res.data.errors.lastName;
            firstNameError.textContent = res.data.errors.firstName;
            emailError.textContent = res.data.errors.email;
            passwordError.textContent = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Inscription validée, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="log-in-form">
          <label htmlFor="lastName">nom</label>
          <br />
          <input
            type="text"
            lastName="lastName"
            id="lastName"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
          <div className="lastName error"></div>
          <br />
          <input
            type="text"
            lastName="firsttName"
            id="firstName"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
          <div className="firsttName error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            lastName="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            lastName="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmation du mot de passe</label>
          <br />

          <input
            type="password"
            lastName="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <label htmlFor="terms">
          <input type="checkbox" id="terms" />
            J'accepte les
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
