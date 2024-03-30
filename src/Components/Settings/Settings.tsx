import { Button, Container, Divider, Title } from '@mantine/core';
import { FC } from 'react';
import { ThemeSwithcer } from '../Shared/ThemeSwithcer/ThemeSwithcer';
import { Link } from '../Shared/Link/Link';
import { Paths } from '../App/Routing/Providers/types/Paths';
import { useAuthStore } from '../../Store';

export const Settings: FC = () => {
  const { logout } = useAuthStore();
  return (
    <Container>
      <Title mt={20}>Настройки</Title>
      <Divider pb={20} mt={20} />

      <Title order={2} pb={20}>
        Тема
      </Title>
      <ThemeSwithcer />

      <Title order={2} pb={20} pt={20}>
        Аккаунт
      </Title>
      <Link to={Paths.Account}>Мой профиль</Link>
      <br />
      <Button bg={'red'} mt={5} onClick={logout}>
        Выйти
      </Button>
    </Container>
  );
};
