import { Navigate } from 'react-router-dom';
import { Paths } from './types/Paths'; // Предполагается, что вы уже определили эти маршруты
import { ReactElement } from 'react';

export type TGuardProps = {
    children: ReactElement;
  };

export const AuthGuard = ({ children }: TGuardProps) => {
  // Проверяем состояние аутентификации в localStorage
  const isAuth = JSON.parse(`${localStorage.getItem('auth')}`);

  if (!isAuth) {
    // Если пользователь не авторизован, перенаправляем его на страницу логина
    return <Navigate to={Paths.Login} />;
  }

  // Если пользователь авторизован, отображаем защищенный контент
  return children;
};
