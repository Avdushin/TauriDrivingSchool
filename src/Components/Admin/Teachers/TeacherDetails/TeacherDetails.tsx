// @ts-nocheck
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
import { Text, Container, Title, Flex, Divider, Breadcrumbs, Anchor } from '@mantine/core';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const TeacherDetails: FC = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список инструкторов', href: AdminPaths.TeachersList },
    { title: 'Данные об инструкторе', href: ''},
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const data = await invoke('fetch_teacher_details', {
          teacherId: parseInt(teacherId, 10),
        });
        setTeacher(data);
      } catch (err) {
        console.error('Failed to fetch teacher details:', err);
      }
    };

    if (teacherId) fetchTeacherDetails();
  }, [teacherId]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <Container shadow='xs' p='md'>
      <Title order={1} pt={20} pb={20}>
        Данные об инструкторе
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <Divider pb={20} />
      <Flex direction='column' spacing='xs'>
        <Text>Имя: {teacher.username}</Text>
        <Text>Email: {teacher.email}</Text>
        <Text>Категория водительских прав: {teacher.dlc}</Text>
        <Text>Phone: {teacher.phone ?? 'Не указан'}</Text>
      </Flex>
    </Container>
  );
};

export default TeacherDetails;
