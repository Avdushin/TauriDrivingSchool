// @ts-nocheck
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Select, Group, Button, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { AdminPaths } from '../../../App/Routing/Providers/types/Paths';

const AddTimetableEntryForm = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [ctype, setCtype] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const classTypes = [
    { value: 'theory', label: 'Теория' },
    { value: 'practice', label: 'Практика' },
  ];

  const resetForm = () => {
    setDate(new Date());
    setTime(new Date());
    setCtype('');
    setTeacherId('');
    setGroupId('');
  };

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
    // Загрузка данных учителей и групп
    const loadData = async () => {
      const fetchedTeachers = await invoke('fetch_teachers');
      const fetchedGroups = await invoke('fetch_groups');
      setTeachers(
        fetchedTeachers.map((teacher) => ({
          value: teacher.id.toString(),
          label: teacher.username,
        }))
      );
      setGroups(
        fetchedGroups.map((group) => ({
          value: group.id.toString(),
          label: group.name,
        }))
      );
    };
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const teacherIdInt = parseInt(teacherId, 10);
      const groupIdInt = parseInt(groupId, 10);

      // Убедитесь, что teacherIdInt и groupIdInt являются допустимыми числами
      if (isNaN(teacherIdInt) || isNaN(groupIdInt)) {
        // Показать уведомление об ошибке
        showNotification({
          title: 'Ошибка',
          message: 'Учитель и группа должны быть выбраны',
          color: 'red',
        });
        return;
      }

      const timeValue =
        time instanceof Date
          ? time.toISOString().split('T')[1].substring(0, 5)
          : '00:00';
      await invoke('create_timetable_entry', {
        entry: {
          date: date.toISOString().split('T')[0],
          time: timeValue,
          ctype,
          teacher_id: teacherIdInt,
          group_id: groupIdInt,
        },
      });

      showNotification({
        title: 'Успех',
        message: 'Запись успешно добавлена в расписание',
        color: 'green',
      });

      resetForm();
    } catch (error) {
      console.error('Ошибка при добавлении записи: ', error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось добавить запись в расписание',
        color: 'red',
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <Title style={{ textAlign: 'center', padding: '20px 0' }}>Добавление расписания</Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <DatePicker
          label='Дата'
          placeholder='Выберите дату'
          value={date}
          onChange={setDate}
          required
        />
        <TimeInput
          label='Время'
          placeholder='Выберите время'
          onChange={setTime}
          required
        />
        <Select
          label='Тип занятия'
          placeholder='Выберите тип занятия'
          value={ctype}
          onChange={setCtype}
          data={classTypes}
          required
        />
        <Select
          label='Учитель'
          placeholder='Выберите учителя'
          value={teacherId}
          onChange={setTeacherId}
          data={teachers}
          required
        />
        <Select
          label='Группа'
          placeholder='Выберите группу'
          value={groupId}
          onChange={setGroupId}
          data={groups}
          required
        />
        <Group position='right' mt='md'>
          <Button type='submit'>Добавить в расписание</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddTimetableEntryForm;
