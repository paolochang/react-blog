import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <div>
      Login
      <AuthTemplate>
        <AuthForm />
      </AuthTemplate>
    </div>
  );
};

export default LoginPage;
