// @ts-nocheck
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Table, Text, Container, Image, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AdminPaths } from '../App/Routing/Providers/types/Paths';
import yoda from '../../assets/master.png';
import { useAuthStore } from '../../Store';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const [role, setRole] = useState('');
  const urole = useAuthStore((state) => state.user?.role);
  const uid = useAuthStore((state) => state.user?.id);

  const userDataString = localStorage.getItem('user');
  if (!userDataString) throw new Error('User data is not available');
  const userData = JSON.parse(userDataString);
  const { id: userId, role: userRole } = userData;

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const userData = JSON.parse(userDataString);
        const { id: uid, role: urole } = userData;
        setRole(role);

        let command = 'fetch_timetable';
        let params = {};

        if (urole === 'teacher') {
          command = 'fetch_teacher_timetable';
          params = { teacherId: uid };
        } else if (urole === 'student') {
          if (!userData.group_id) throw new Error('Group ID is not available');
          params = { groupId: userData.group_id };
        } else if (urole === 'administrator') return;

        const data = await invoke(command, params);
        setTimetable(data);
      } catch (err) {
        console.error('Failed to fetch timetable:', err);
      }
    };

    fetchTimetable();
  }, []);

  const translateCtype = (ctype) => {
    switch (ctype) {
      case 'theory':
        return 'Теория';
      case 'practice':
        return 'Практика';
      default:
        return ctype;
    }
  };

  if (urole === 'administrator') {
    return (
      <Container>
        <Image radius='md' src={yoda} />
        <Text align='center' size='lg' mt='md'>
          У бога нет расписания, но если очень хочешь им поуправлять, переходи{' '}
          <Link to={AdminPaths.TimeTable}>сюда</Link>
        </Text>
      </Container>
    );
  } else {
    return (
      <>
        <Title style={{ textAlign: 'center' }} pt={20} pb={20}>
          Расписание
        </Title>
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
                <Table.Td>{entry.date}</Table.Td>
                <Table.Td>{entry.time}</Table.Td>
                <Table.Td>{translateCtype(entry.ctype)}</Table.Td>
                <Table.Td>{entry.teacher_name}</Table.Td>
                <Table.Td>{entry.group_name}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </>
    );
  }
};

export default TimeTable;
