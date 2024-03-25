import { FC } from 'react';
import StudentLoginForm from '../../Components/Auth/StudentLoginForm/StudentLoginForm';
import { Title } from '@mantine/core';

export const LoginPage: FC = () => {
  return (
    <>
      <Title order={1} pt={20} pb={20}>Авторизация</Title>
      <StudentLoginForm />
    </>
  );
};
