//@ts-nocheck
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Button,
  Group,
  Box,
  Select,
  NumberInput,
  Anchor,
  Title,
  Breadcrumbs,
} from '@mantine/core';
import { AdminPaths } from '../../../../App/Routing/Providers/types/Paths';

const AddPayment = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentsList = await invoke('fetch_students');
        setStudents(
          studentsList.map((student) => ({
            value: student.id.toString(),
            label: `${student.username} (${student.email})`,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    loadStudents();
  }, []);

  const items = [
    { title: 'Панель Администратора', href: AdminPaths.Panel },
    { title: 'Добавление платежа', href: '' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await invoke('create_payment', {
        payment: {
          student_id: parseInt(selectedStudent, 10),
          amount: parseFloat(amount),
          ptype: paymentType,
        },
      });

      alert('Счет на оплату успешно выставлен!');
      setSelectedStudent('');
      // setAmount('');
      setPaymentType('');
    } catch (error) {
      console.error('Не удалось добавить платеж: ' + error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx='auto'>
      <Title pt={20} pb={20}>
        Выставление счета на оплату
      </Title>
      <Breadcrumbs pb={20}>{items}</Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Select
          label='Студент'
          placeholder='Выберите студента'
          value={selectedStudent}
          onChange={setSelectedStudent}
          data={students}
          required
        />
        <NumberInput
          label='Сумма'
          value={amount}
          onChange={(value) => setAmount(value)}
          required
        />
        <Select
          label='Тип платежа'
          placeholder='Выберите тип платежа'
          value={paymentType}
          onChange={setPaymentType}
          data={[
            { value: 'tuition', label: 'Обучение' },
            { value: 'other', label: 'Другое' },
          ]}
          required
        />
        <Group mt='md'>
          <Button type='submit'>Выставить счет</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddPayment;
