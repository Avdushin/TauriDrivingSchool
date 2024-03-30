// @ts-nocheck
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

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список студентов', href: AdminPaths.StudentsList },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  //@ remove
  const [modalOpened, setModalOpened] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleRemoveClick = (student) => {
    setStudentToDelete(student);
    setModalOpened(true);
  };

  const confirmRemove = async () => {
    if (studentToDelete) {
      try {
        await invoke('remove_student', { studentId: studentToDelete.id });
        const updatedTeachers = students.filter(
          (t) => t.id !== studentToDelete.id
        );
        setStudents(updatedTeachers);
        alert(`Студент ${studentToDelete.username} успешно отчислен`);
      } catch (err) {
        console.error('Failed to remove student:', err);
      }
    }
    setModalOpened(false);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await invoke('fetch_students');
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Container>
      <Title order={1} pt={20} pb={20}>
        Список студентов
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title='Подтвердите действие'
      >
        <Text>
          Вы уверены, что хотите отчислить студента{' '}
          <b>{studentToDelete?.username}</b>?
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
            <Table.Th>Группа</Table.Th>
            <Table.Th>Телефон</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {students.map((student) => (
            <Table.Tr key={student.id} style={{ cursor: 'pointer' }}>
              <Table.Td>{student.id}</Table.Td>
              <Table.Td>{student.username}</Table.Td>
              <Table.Td>{student.email}</Table.Td>
              <Table.Td>{student.group_name}</Table.Td>
              <Table.Td>{student.phone}</Table.Td>
              <Table.Td onClick={() => navigate(`/student/${student.id}`)}>
                <Tooltip label='Профиль'>
                  <IconUserFilled></IconUserFilled>
                </Tooltip>
              </Table.Td>
              <Table.Td>
                <Tooltip label='Отчислить'>
                  <IconUserCancel
                    color='red'
                    onClick={() => handleRemoveClick(student)}
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

export default StudentsList;
