import { Paths } from './types/Paths';
import { ReactElement, useEffect } from 'react';
import useAuthStore from '../../../../Store/authStore';
import { Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

export type TGuardProps = {
  children: ReactElement;
  isAdmin?: boolean;
};

export const AuthGuard = ({ children, isAdmin }: TGuardProps) => {
  const isAuthLocalStorage = Boolean(localStorage.getItem('auth'));
  const { user, fetchAndSetUserData } = useAuthStore();

  useEffect(() => {
    if (isAuthLocalStorage && !user) {
      fetchAndSetUserData();
    }
  }, [isAuthLocalStorage, user, fetchAndSetUserData]);

  if (isAuthLocalStorage && !user) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={3}
        overlayProps={{ radius: 'lg' }}
      />
    );
  }

  if (!isAuthLocalStorage) {
    return <Navigate to={Paths.Login} />;
  }

  if (isAdmin && user?.role !== 'administrator') {
    return <Navigate to={Paths.Home} />;
  }

  return children;
};
