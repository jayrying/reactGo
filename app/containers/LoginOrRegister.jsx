import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { beginLogin, beginSignUp, toggleLoginMode } from '../actions/users';
import hourGlassSvg from '../images/hourglass.svg';
import {
  Alternative,
  AlternativeLink, Button,
  EmailContainer,
  GoogleContainer,
  Header,
  Heading, Hint, Input, Loading,
  LoginWrapper, Message,
} from '../css/components/login';

const LoginOrRegister = () => {
  const { isWaiting, message, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatchToggleLoginMode = () => dispatch(toggleLoginMode());

  const onChangeEmail = useCallback((event) => {
    setEmail(event.currentTarget.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.currentTarget.value);
  }, []);

  const handleOnSubmit = useCallback((event) => {
    event.preventDefault();

    if (isLogin) {
      dispatch(beginLogin({ email, password }));
    } else {
      dispatch(beginSignUp({ email, password }));
    }
  }, [isLogin, email, password]);

  const renderHeader = () => {
    if (isLogin) {
      return (
        <Header>
          <Heading>Login with Email</Heading>
          <Alternative>
            Not what you want?
            <AlternativeLink
              type="button"
              onClick={dispatchToggleLoginMode}
            >
              Register an Account
            </AlternativeLink>
          </Alternative>
        </Header>
      );
    }

    return (
      <Header>
        <Heading>Register with Email</Heading>
        <Alternative>
          Already have an account?
          <AlternativeLink
            type="button"
            onClick={dispatchToggleLoginMode}
          >
            Login
          </AlternativeLink>
        </Alternative>
      </Header>
    );
  };

  return (
    <LoginWrapper waiting={isWaiting}>
      <div>
        {renderHeader()}
        <Loading alt="loading" src={hourGlassSvg} />
        <EmailContainer>
          <form onSubmit={handleOnSubmit}>
            <Input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="password"
            />
            <Hint>
              <div>Hint</div>
              <div>email: example@ninja.com password: ninja</div>
            </Hint>
            <Message show={message && message.length > 0}>
              {message}
            </Message>
            <Button
              as="input"
              type="submit"
              value={isLogin ? 'Login' : 'Register'} />
          </form>
        </EmailContainer>
        <GoogleContainer>
          <Heading>Google Login Demo</Heading>
          <Button
            as="a"
            href="/auth/google">
            Login with Google
          </Button>
        </GoogleContainer>
      </div>
    </LoginWrapper>
  );
};

export default LoginOrRegister;
