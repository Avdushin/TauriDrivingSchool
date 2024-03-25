import { FC } from 'react';
import StudentRegistrationForm from '../../Components/Auth/StudentRegistration/StudentRegistrationForm';
import { Title } from '@mantine/core';

export const RegisterPage: FC = () => {
  return (
    <>
      <Title order={1} pt={20} pb={20}>Регистрация</Title>
      <StudentRegistrationForm />
    </>
  );
};
