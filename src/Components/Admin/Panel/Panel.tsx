import { Container, Divider, Flex, Title } from '@mantine/core';
import { FC } from 'react';
import { AdminPaths } from '../../App/Routing/Providers/types/Paths';
import { AdminCard } from '../..';

const Panel: FC = () => {
  return (
    <Container>
      <Title order={1} style={{ textAlign: 'center', paddingTop: '20px' }}>
        Панель Администратора
      </Title>
      <Divider mt={20}/>
      <Title order={2} pt={40}>Операции над инструкторами</Title>
      <Flex justify={'center'} gap={20}>
      <AdminCard
          title="Список инструкторов"
          description="В данном разделе администратор может получить список инструкторов автошколы"
          href={AdminPaths.TeachersList}
        />
        <AdminCard
          title="Добавить инструктора"
          description="В данном разделе администратор может добавить нового преподавателя в автошколу"
          href={AdminPaths.AddTeacher}
        />
      </Flex>
    </Container>
  );
};

export default Panel;