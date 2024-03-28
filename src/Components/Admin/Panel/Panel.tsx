import { Box, Card, Container, Divider, Flex, Group, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { AdminPaths } from '../../App/Routing/Providers/types/Paths';

const Panel: FC = () => {
  return (
    <Container>
      <Title order={1} style={{ textAlign: 'center', paddingTop: '20px' }}>
        Панель Администратора
      </Title>
      <Divider mt={20}/>
      <Title order={2} pt={40}>Операции над инструкторами</Title>
      <Flex justify={'center'} gap={20}>
        <Box component='a' href={AdminPaths.TeachersList}>
          <Card mt={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' mt='md' mb='xs'>
              <Text fw={500}>Список инструкторов</Text>
            </Group>

            <Text size='sm' c='dimmed'>
              В данном разделе администратор может получить список инструкторов
              автошколы
            </Text>
          </Card>
        </Box>

        <Box component='a' href={AdminPaths.AddTeacher}>
          <Card mt={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' mt='md' mb='xs'>
              <Text fw={500}>Добавить инструктора</Text>
            </Group>

            <Text size='sm' c='dimmed'>
              В данном разделе администратор может добавить нового преподавателя
              в автошколу
            </Text>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
};

export default Panel;
