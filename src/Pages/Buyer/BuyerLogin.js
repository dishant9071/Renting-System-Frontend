import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signinposter from '../../Assets/signinposter.png';
import LoginInput from '../../Components/Input/LoginInput';
import axios from 'axios';
import { useAlert } from 'react-alert';

const BuyerLogin = (props) => {
  const alert = useAlert();
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    axios
      .post('http://localhost:5000/buyer/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        const data = response.data;
        if (data.error) {
          alert.error(data.msg);
          localStorage.removeItem('buyer');
          localStorage.removeItem('auth_token');
        } else {
          alert.success('Welcome');
          localStorage.setItem('buyer', true);
          localStorage.setItem('auth_token', data.auth_token);
          props.handleClick();
          return history.push('./../');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className='BuyerLogin-body'>
      <div className='BuyerLogin-content'>
        <div className='BuyerLogin-text-body'>
          <div className='BuyerLogin-text'>Sign in</div>
        </div>
        <div className='BuyerLogin-input-main'>
          <LoginInput
            icon={emailOutline}
            placeholder={'E-mail'}
            type={'text'}
            handleInput={handleInputEmail}
          />
          <LoginInput
            icon={lockOutline}
            placeholder={'Password'}
            type={'password'}
            handleInput={handleInputPassword}
          />
          <div className='BuyerLogin-remember'>
            <input type='checkbox' className='BuyerLogin-checkbox' />
            <span className='BuyerLogin-remember-text'>Remember me</span>
          </div>
          <div className='BuyerLogin-login' onClick={handleOnClick}>
            Log in
          </div>
        </div>
        <div className='BuyerLogin-create'>
          <Link to='./register'>Create an account</Link>
        </div>
      </div>
      <div className='BuyerLogin-logo'>
        <img
          src={signinposter}
          alt={'SignInPoster'}
          className='BuyerLogin-poster'
        />
        <div className='BuyerLogin-create2'>
          <Link to='../seller/login'>Sign in as a Seller</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;
