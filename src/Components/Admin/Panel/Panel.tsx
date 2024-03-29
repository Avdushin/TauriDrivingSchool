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
      <Divider mt={20} />
      <Title order={2} pt={40}>
        Операции над инструкторами
      </Title>
      <Flex justify={'center'} gap={20}>
        <AdminCard
          title='Список инструкторов'
          description='В данном разделе администратор может получить список инструкторов автошколы'
          href={AdminPaths.TeachersList}
        />
        <AdminCard
          title='Добавить инструктора'
          description='В данном разделе администратор может добавить нового преподавателя в автошколу'
          href={AdminPaths.AddTeacher}
        />
      </Flex>
      <Title order={2} pt={40}>
        Операции над студентами
      </Title>
      <Flex justify={'center'} gap={20}>
        <AdminCard
          title='Список студентов'
          description='В данном разделе администратор может получить список студентов автошколы'
          href={AdminPaths.StudentsList}
        />
        <AdminCard
          title='Добавить студента'
          description='В данном разделе администратор может добавить нового студента в автошколу'
          href={AdminPaths.AddStudent}
        />
        <AdminCard
          title='Создать группу'
          description='В данном разделе администратор может создать новую группу'
          href={AdminPaths.AddGroup}
        />
      </Flex>
      <Title order={2} pt={40}>
        Расписание занятий
      </Title>
      <Flex justify={'start'} gap={20}>
        <AdminCard
          title='Обновить расписание'
          description='В данном разделе администратор может обновить расписание занятий'
          href={AdminPaths.AddTimeTable}
        />
        <AdminCard
          title='Посмотреть расписание'
          description='В данном разделе администратор может посмотреть расписание занятий'
          href={AdminPaths.TimeTable}
        />
      </Flex>
    </Container>
  );
};

export default Panel;
