import { FC } from 'react';
import { useState, useEffect } from 'react';
import { Container, Title, Text, Divider } from '@mantine/core';
import useAuthStore, { UserData } from '../../Store/authStore';

const TransliteRole = (role: string) => {
  switch (role) {
    case 'administrator':
      return 'Администратор';
    case 'teacher':
      return 'Учитель';
    case 'student':
      return 'Студент';
  }
};

const Account: FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { fetchAndSetUserData } = useAuthStore();

  useEffect(() => {
    const getUserData = async () => {
      const { success, error } = await fetchAndSetUserData();
      if (success) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUserData = JSON.parse(userData) as UserData;
          setUser(parsedUserData);
        } else {
          console.error('User data not found in LocalStorage');
        }
      } else {
        console.error('Failed to fetch user data:', error);
      }
    };

    getUserData();
  }, [fetchAndSetUserData]);

  return (
    <Container pt={20}>
      <Title>Личный кабинет</Title>
      <Divider size={2} pt={10} />
      {user && (
        <Text size='lg'>
          Имя пользователя: {user?.username || 'Guest'}
          <br />
          Почта: {user.email}
          <br />
          Роль: {TransliteRole(user.role)}
          <br />
          Source: {user.source}
          {user.role === 'student' && (
            <>
              <br />
              Группа: {user.group_name}
            </>
          )}
        </Text>
      )}
    </Container>
  );
};

export default Account;
