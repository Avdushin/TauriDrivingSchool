import { useState, useEffect } from 'react';
import { Container, Title, Text } from '@mantine/core';
import useAuthStore, { UserData } from '../../Store/authStore';

export const Hero = () => {
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
      <Title>Welcome {user?.username || 'Guest'}</Title>
      {user && (
        <Text>
          Your email: {user.email}
          <br />
          Your role: {user.role}
          <br />
          Source: {user.source}
        </Text>
      )}
    </Container>
  );
};
