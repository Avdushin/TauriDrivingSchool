import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button, TextInput, Group, Box, Select, Anchor, Title, Breadcrumbs } from '@mantine/core';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const AddTeacherForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dlc, setDlc] = useState('');
  const [phone, setPhone] = useState('');

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Список инструкторов', href: AdminPaths.TeachersList },
    { title: 'Добавление инструктора', href: AdminPaths.AddTeacher },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await invoke('create_teacher', {
        newTeacher: { username, email, password, dlc, phone },
      });
      alert('Teacher created successfully');
      setUsername('');
      setEmail('');
      setPassword('');
      setDlc('');
      setPhone('');
      //   setTimeout(() => {
      //     Navigate(AdminPaths.Panel);
      //   }, 2000);
    } catch (error) {
      console.log('Failed to create teacher: ' + error);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <Title pt={20} pb={20}>Добавление инструктора</Title>
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
        {/* <TextInput
          label='Категория водительских прав'
          value={dlc}
          onChange={(e) => setDlc(e.target.value)}
        /> */}
        <Select
          label='Категория водительских прав'
          placeholder='Выберите категорию прав'
          value={dlc}
          onChange={(value) => setDlc(value)}
          data={['B1', 'B2', 'C1', 'C2']}
        />
        <TextInput
          label='Телефон'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Group mt='md'>
          <Button type='submit'>Добавить инструктора</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddTeacherForm;
