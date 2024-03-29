import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Title,
  Anchor,
  Breadcrumbs,
} from '@mantine/core';
import { AdminPaths } from '../../App/Routing/Providers/types/Paths';

const AddGroupForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await invoke('create_group', { newGroup: { name, description } });
      alert('Группа успешно создана');
      setName('');
      setDescription('');
    } catch (error) {
      alert(`Ошибка при создании группы: ${error}`);
    }
  };

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Создать новую группу', href: AdminPaths.AddGroup },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Box sx={{ maxWidth: 500 }} mx='auto'>
      <Title order={2} my='lg'>
        Добавление новой группы
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Название группы'
          placeholder='Введите название'
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <Textarea
          label='Описание'
          placeholder='Введите описание'
          mt='md'
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <Group position='right' mt='md'>
          <Button type='submit'>Добавить группу</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddGroupForm;
