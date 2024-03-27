import { Paths } from './types/Paths';
import { ReactElement, useEffect } from 'react';
import useAuthStore from '../../../../Store/authStore';
import { Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

export type TGuardProps = {
  children: ReactElement;
};

export const AuthGuard = ({ children }: TGuardProps) => {
  const isAuthLocalStorage = Boolean(localStorage.getItem('auth'));
  const { user, fetchAndSetUserData } = useAuthStore();

  useEffect(() => {
    if (isAuthLocalStorage && !user) {
      fetchAndSetUserData();
    }
  }, [isAuthLocalStorage, user, fetchAndSetUserData]);

  if (isAuthLocalStorage && !user) {
    // Показать индикатор загрузки или вернуть null, пока идет загрузка данных пользователя
    return <LoadingOverlay
    visible={true}
    zIndex={10000}
    overlayProps={{ radius: 'lg', blur: 20 }}
  />;
  }

  if (!isAuthLocalStorage) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    return <Navigate to={Paths.Login} />;
  }

  // Пользователь аутентифицирован, отображаем дочерние компоненты
  return children;
};
