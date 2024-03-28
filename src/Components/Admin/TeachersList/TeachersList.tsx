import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Anchor, Breadcrumbs, Container, Table, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AdminPaths } from '../../App/Routing/Providers/types/Paths';

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
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>DLC</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Actions</Table.Th>
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
                Профиль
              </Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeachersList;
