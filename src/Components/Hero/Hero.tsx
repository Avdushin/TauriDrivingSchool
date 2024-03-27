import { useState, useEffect } from 'react';
import { Container, Title, Text } from '@mantine/core';

export const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получение данных пользователя из LocalStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    } else {
      console.error('User data not found in LocalStorage');
    }
  }, []);

  return (
    <Container pt={20}>
      <Title>Welcome {user?.username || "Guest"}</Title>
      {user && (
        <Text>
          Your email: {user.email}<br />
          Your role: {user.role}<br />
          Source: {user.source}
        </Text>
      )}
    </Container>
  );
}
