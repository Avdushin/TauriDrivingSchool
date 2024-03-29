import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Button,
  TextInput,
  Group,
  Box,
  Select,
  Anchor,
  Title,
  Breadcrumbs,
} from '@mantine/core';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const AddStudent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groupList = await invoke('fetch_groups');
        setGroups(
          groupList.map((group) => ({
            value: group.id.toString(),
            label: group.name,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    loadGroups();
  }, []);

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список студентов', href: AdminPaths.StudentsList },
    { title: 'Добавление студента', href: AdminPaths.AddStudent },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await invoke('create_student', {
        newStudent: {
          username,
          email,
          password,
          group_id: parseInt(group, 10),
          phone,
        },
      });
      alert('Студент успешно добавлен!');
      setUsername('');
      setEmail('');
      setPassword('');
      setGroup('');
      setPhone('');
    } catch (error) {
      console.log('Неудалось добавить студента: ' + error);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <Title pt={20} pb={20}>
        Добавление студента
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Select
          label='Группа'
          placeholder='Выберите группу'
          value={group}
          onChange={(value) => setGroup(value)}
          data={groups}
        />
        <TextInput
          label='Телефон'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={11}
        />
        <Group mt='md'>
          <Button type='submit'>Добавить студента</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddStudent;
