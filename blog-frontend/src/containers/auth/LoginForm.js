import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useHistory } from 'react-router';
import { check } from '../../modules/user';

const LoginForm = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log(authError);
      setError('Failed to login');
      return;
    }
    if (auth) {
      console.log('Login success');
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
