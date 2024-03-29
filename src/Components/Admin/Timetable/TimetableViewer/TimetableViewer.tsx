import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Table,
  Button,
  Modal,
  Text,
  Container,
  Title,
  Divider,
  Anchor,
  Breadcrumbs,
} from '@mantine/core';
import { IconTrashFilled, IconX } from '@tabler/icons-react';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const TimetableViewer = () => {
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState(null);

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Расписание', href: AdminPaths.TimeTable },
    { title: 'Добавление расписания', href: AdminPaths.AddTimeTable },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const loadTimetableEntries = async () => {
      try {
        const entries = await invoke('fetch_timetable_entries');
        setTimetableEntries(entries);
      } catch (error) {
        console.error('Ошибка при загрузке расписания: ', error);
      }
    };

    loadTimetableEntries();
  }, []);

  const handleDeleteClick = (entryId) => {
    setIsDeleteModalOpen(true);
    setDeletingEntryId(entryId);
  };

  const confirmDelete = async () => {
    try {
      console.log('Удаляем занятие с ID:', deletingEntryId);

      if (deletingEntryId === null || deletingEntryId === undefined) {
        console.error('ID занятия не задан');
        return;
      }

      await invoke('delete_timetable_entry', {
        entry: { id: deletingEntryId },
      });

      setIsDeleteModalOpen(false);
      // Обновляем список занятий после удаления
      const updatedEntries = await invoke('fetch_timetable_entries');
      setTimetableEntries(updatedEntries);
    } catch (error) {
      console.error('Ошибка при удалении занятия: ', error);
    }
  };

  return (
    <Container>
      <Title order={1} style={{ textAlign: 'center', padding: '20px 0' }}>
        Расписание занятий
      </Title>
      <Divider pb={40} />
      <Breadcrumbs pb={40}>{items}</Breadcrumbs>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Время</Table.Th>
            <Table.Th>Тип занятия</Table.Th>
            <Table.Th>Учитель</Table.Th>
            <Table.Th>Группа</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {timetableEntries.map((entry) => (
            <Table.Tr key={entry.id}>
              <Table.Td>{entry.id}</Table.Td>
              <Table.Td>{entry.date}</Table.Td>
              <Table.Td>{entry.time}</Table.Td>
              <Table.Td>{entry.ctype}</Table.Td>
              <Table.Td>{entry.teacher}</Table.Td>
              <Table.Td>{entry.group}</Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <IconTrashFilled
                  color='red'
                  onClick={() => handleDeleteClick(entry.id)}
                ></IconTrashFilled>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Подтверждение удаления'
      >
        <Text>Вы уверены, что хотите удалить это занятие?</Text>
        <Button color='red' onClick={confirmDelete}>
          Удалить
        </Button>
      </Modal>
    </Container>
  );
};

export default TimetableViewer;
