import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Modal,
  Select,
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
  IconArrowRightCircle,
} from '@tabler/icons-react';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [transferModalOpened, setTransferModalOpened] = useState(false);
  const [removeModalOpened, setRemoveModalOpened] = useState(false);
  const [studentToTransfer, setStudentToTransfer] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список студентов', href: AdminPaths.StudentsList },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStudents = await invoke('fetch_students');
      const fetchedGroups = await invoke('fetch_groups');
      setStudents(fetchedStudents);
      setGroups(
        fetchedGroups.map((group) => ({
          value: group.id.toString(),
          label: group.name,
        }))
      );
    };

    fetchData();
  }, []);

  const handleTransferClick = (student) => {
    setStudentToTransfer(student);
    setTransferModalOpened(true);
  };

  const handleRemoveClick = (student) => {
    setStudentToDelete(student);
    setRemoveModalOpened(true);
  };

  const confirmTransfer = async () => {
    if (studentToTransfer && selectedGroup) {
      await invoke('update_student_group', {
        studentId: studentToTransfer.id,
        groupId: Number(selectedGroup),
      });
      setTransferModalOpened(false);
      setSelectedGroup('');
      const updatedStudents = await invoke('fetch_students');
      setStudents(updatedStudents);
    }
  };

  const confirmRemove = async () => {
    if (studentToDelete) {
      await invoke('remove_student', { studentId: studentToDelete.id });
      const updatedStudents = students.filter(
        (student) => student.id !== studentToDelete.id
      );
      setStudents(updatedStudents);
      setRemoveModalOpened(false);
    }
  };

  return (
    <Container>
      <Title order={1} pt={20} pb={20}>
        Список студентов
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <Modal
        opened={transferModalOpened}
        onClose={() => setTransferModalOpened(false)}
        title='Перевести студента'
      >
        <Select
          data={groups}
          value={selectedGroup}
          onChange={setSelectedGroup}
          placeholder='Выберите группу'
        />
        <Center>
          <Button onClick={confirmTransfer} mt={20}>
            Перевести
          </Button>
        </Center>
      </Modal>
      <Modal
        opened={removeModalOpened}
        onClose={() => setRemoveModalOpened(false)}
        title='Подтверждение удаления'
      >
        <Text>
          Вы уверены, что хотите удалить студента {studentToDelete?.username}?
        </Text>
        <Center>
          <Button onClick={confirmRemove} color='red' mt={20}>
            Удалить
          </Button>
        </Center>
      </Modal>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Имя пользователя</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Группа</Table.Th>
            <Table.Th>Телефон</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {students.map((student) => (
            <Table.Tr key={student.id}>
              <Table.Td>{student.id}</Table.Td>
              <Table.Td>{student.username}</Table.Td>
              <Table.Td>{student.email}</Table.Td>
              <Table.Td>{student.group_name || 'Нет группы'}</Table.Td>
              <Table.Td>{student.phone || 'Нет данных'}</Table.Td>
              <Table.Td>
                <Tooltip label='Профиль'>
                  <IconUserFilled
                    onClick={() => navigate(`/student/${student.id}`)}
                  />
                </Tooltip>
                <Tooltip label='Перевести'>
                  <IconArrowRightCircle
                    onClick={() => handleTransferClick(student)}
                  />
                </Tooltip>
                <Tooltip label='Удалить'>
                  <IconUserCancel
                    color='red'
                    onClick={() => handleRemoveClick(student)}
                  />
                </Tooltip>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default StudentsList;
