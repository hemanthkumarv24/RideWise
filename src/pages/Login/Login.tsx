import { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [action, setAction] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [registerDisabled, setRegisterDisabled] = useState(true);

  const registerLink = () => {
    setAction(' active');
  };

  const loginLink = () => {
    setAction('');
  };

  // Function to handle username input change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    updateLoginButtonState(e.target.value, password);
  };

  // Function to handle email input change and validate format
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    updateRegisterButtonState(username, emailValue, password, agreeTerms);
  };

  // Function to handle password input change and validate strength
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    updateLoginButtonState(username, passwordValue);
    updateRegisterButtonState(username, email, passwordValue, agreeTerms);
  };

  // Function to handle terms agreement checkbox change
  const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked);
    updateRegisterButtonState(username, email, password, e.target.checked);
  };

  // Function to update login button disabled state based on input validity
  const updateLoginButtonState = (user: string, pass: string) => {
    if (user.trim() !== '' && pass.trim() !== '') {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  // Function to update register button disabled state based on input validity
  const updateRegisterButtonState = (user: string, mail: string, pass: string, terms: boolean) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (user.trim() !== '' && emailRegex.test(mail) && strongPasswordRegex.test(pass) && terms) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  };

  // Function to check if password meets strong criteria for login
  const isPasswordStrongForLogin = (pass: string) => {
    // Adjust as per your login password strength criteria
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return strongPasswordRegex.test(pass);
  };

  return (
    <div className="login-page">
      <div className={`wrapper ${action}`}>
        <div className="form-box login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={handleUsernameChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={!isPasswordStrongForLogin(password) ? 'weak-password' : ''}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Remember me
              </label>
              <a href="#">Forgot Password ?</a>
            </div>
            <Link to="/home2">
              <button type="submit" disabled={loginDisabled || !isPasswordStrongForLogin(password)}>
                Login
              </button>
            </Link>
            <div className="register-link">
              <p>
                Don't have an account? <a href="#" onClick={registerLink}>Register</a>
              </p>
            </div>
          </form>
        </div>
        <div className="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={handleUsernameChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" checked={agreeTerms} onChange={handleAgreeTermsChange} />I agree to the terms & conditions
              </label>
            </div>
            <Link to="/home2">
              <button type="submit" disabled={registerDisabled}>
                Register
              </button>
            </Link>
            <div className="register-link">
              <p>
                Already have an account? <a href="#" onClick={loginLink}>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
