import { FC } from 'react';
import { Title, Container, Card, Text, Flex, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import drive_school from '../../assets/mh.png';
import { Paths } from '../App/Routing/Providers/types/Paths';

export const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title order={1} pt={20} align='center' mb={50}>
        Добро пожаловать в автошколу Аргос!
      </Title>
      <Image
        src={drive_school}
        w={'65%'}
        // h={'20%'}
        style={{ margin: '0px auto' }}
        pb={20}
      />
      {/* <Title order={2} align='center' pb={20} pt={20}>
        Виджеты
      </Title> */}
      <Flex justify='center' gap={'lg'}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'
          withBorder
          style={{ width: 300, cursor: 'pointer' }}
          onClick={() => navigate(Paths.Timetable)}
        >
          <Text size='lg' weight={500}>
            Расписание занятий
          </Text>
          <Text size='sm' mt={5}>
            Просмотрите расписание занятий.
          </Text>
        </Card>

        <Card
          shadow='sm'
          p='lg'
          radius='md'
          withBorder
          style={{ width: 300, cursor: 'pointer' }}
          onClick={() => navigate(Paths.Payment)}
        >
          <Text size='lg' weight={500}>
            Оплата счетов
          </Text>
          <Text size='sm' mt={5}>
            Оплатите счета за обучение.
          </Text>
        </Card>
      </Flex>
      <Flex justify='center' gap={'lg'} pt={20} pb={20}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'
          withBorder
          style={{ width: 300, cursor: 'pointer' }}
          onClick={() => navigate(Paths.Account)}
        >
          <Text size='lg' weight={500}>
            Личный кабинет
          </Text>
          <Text size='sm' mt={5}>
            Просмотрите личный кабинет.
          </Text>
        </Card>

        <Card
          shadow='sm'
          p='lg'
          radius='md'
          withBorder
          style={{ width: 300, cursor: 'pointer' }}
          onClick={() => navigate(Paths.Settings)}
        >
          <Text size='lg' weight={500}>
            Настройки
          </Text>
          <Text size='sm' mt={5}>
            Настройте программу под себя.
          </Text>
        </Card>
      </Flex>
    </Container>
  );
};
