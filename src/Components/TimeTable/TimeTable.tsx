import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Table, Text, Container, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AdminPaths } from '../App/Routing/Providers/types/Paths';
import yoda from '../../assets/master.png';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // Получаем данные пользователя из localStorage
        const userDataString = localStorage.getItem('user');
        if (!userDataString) throw new Error('User data is not available');

        const userData = JSON.parse(userDataString);
        const { group_id: groupId, role: userRole } = userData;
        setRole(userRole);

        // Для администратора расписание не загружаем
        if (userRole === 'administrator') return;

        // Проверяем, что у пользователя есть группа
        if (!groupId) throw new Error('Group ID is not available');

        const data = await invoke('fetch_timetable', { groupId: groupId });
        setTimetable(data);
      } catch (err) {
        console.error('Failed to fetch timetable:', err);
      }
    };

    fetchTimetable();
  }, []);

  if (role === 'administrator') {
    return (
      <Container>
        <Image radius='md' src={yoda} />
        <Text align='center' size='lg' mt='md'>
          У бога нет расписания, но если очень хочешь им поуправлять, переходи{' '}
          <Link to={AdminPaths.TimeTable}>сюда</Link>
        </Text>
      </Container>
    );
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Teacher</Table.Th>
          <Table.Th>Group</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {timetable.map((entry, index) => (
          <Table.Tr key={index}>
            <Table.Td>{entry.date}</Table.Td>
            <Table.Td>{entry.time}</Table.Td>
            <Table.Td>{entry.ctype}</Table.Td>
            <Table.Td>{entry.teacher_name}</Table.Td>
            <Table.Td>{entry.group_name}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default TimeTable;
