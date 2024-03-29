import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Modal,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';
import {
  IconUserCancel,
  IconUserFilled,
} from '@tabler/icons-react';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список инструкторов', href: AdminPaths.TeachersList },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  //@ remove
  const [modalOpened, setModalOpened] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const handleRemoveClick = (teacher) => {
    setTeacherToDelete(teacher);
    setModalOpened(true);
  };

  const confirmRemove = async () => {
    if (teacherToDelete) {
      try {
        await invoke('remove_teacher', { teacherId: teacherToDelete.id });
        // Обновите список учителей после удаления
        const updatedTeachers = teachers.filter(
          (t) => t.id !== teacherToDelete.id
        );
        setTeachers(updatedTeachers);
        alert(`Учитель ${teacherToDelete.username} успешно уволен`);
      } catch (err) {
        console.error('Failed to remove teacher:', err);
      }
    }
    setModalOpened(false);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await invoke('fetch_teachers');
        setTeachers(data);
      } catch (err) {
        console.error('Failed to fetch teachers:', err);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Container>
      <Title order={1} pt={20} pb={20}>
        Список инструкторов
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title='Подтвердите действие'
      >
        <Text>
          Вы уверены, что хотите уволить сотрудника{' '}
          <b>{teacherToDelete?.username}</b>?
        </Text>
        <Center>
          <Button onClick={confirmRemove} color='red' mt={20}>
            Уволить
          </Button>
        </Center>
      </Modal>
      <Table></Table>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Категория прав</Table.Th>
            <Table.Th>Телефон</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {teachers.map((teacher) => (
            <Table.Tr key={teacher.id} style={{ cursor: 'pointer' }}>
              <Table.Td>{teacher.id}</Table.Td>
              <Table.Td>{teacher.username}</Table.Td>
              <Table.Td>{teacher.email}</Table.Td>
              <Table.Td>{teacher.dlc}</Table.Td>
              <Table.Td>{teacher.phone}</Table.Td>
              <Table.Td onClick={() => navigate(`/teacher/${teacher.id}`)}>
                <Tooltip label='Профиль'>
                  <IconUserFilled></IconUserFilled>
                </Tooltip>
              </Table.Td>
              <Table.Td>
                <Tooltip label='Уволить'>
                  <IconUserCancel
                    color='red'
                    onClick={() => handleRemoveClick(teacher)}
                  ></IconUserCancel>
                </Tooltip>
              </Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeachersList;
