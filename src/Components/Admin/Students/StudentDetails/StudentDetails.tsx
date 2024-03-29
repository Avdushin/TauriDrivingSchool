// @ts-nocheck
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
import { Text, Container, Title, Flex, Divider, Breadcrumbs, Anchor } from '@mantine/core';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const StudentDetails: FC = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список студентов', href: AdminPaths.StudentsList },
    { title: 'Данные об студенте', href: ''},
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await invoke('fetch_student_details', {
          studentId: parseInt(studentId, 10),
        });
        setStudent(data);
      } catch (err) {
        console.error('Failed to fetch teacher details:', err);
      }
    };

    if (studentId) fetchStudentDetails();
  }, [studentId]);

  if (!student) return <div>Loading...</div>;

  return (
    <Container shadow='xs' p='md'>
      <Title order={1} pt={20} pb={20}>
        Данные об инструкторе
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <Divider pb={20} />
      <Flex direction='column' spacing='xs'>
        <Text>Имя: {student.username}</Text>
        <Text>Email: {student.email}</Text>
        <Text>Phone: {student.phone ?? 'Не указан'}</Text>
        <Text>Группа: {student.group_name}</Text>
      </Flex>
    </Container>
  );
};

export default StudentDetails;
