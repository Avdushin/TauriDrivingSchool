//@ts-nocheck
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Table, Container, Title } from '@mantine/core';
import { useAuthStore } from '../../../../../Store';

const TransliteType = (role: string) => {
    switch (role) {
      case 'tuition':
        return 'Оплата за обучение';
      case 'other':
        return 'Другое';
    }
  };

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const uid = useAuthStore((state) => state.user?.id);

  const userDataString = localStorage.getItem('user');
  if (!userDataString) throw new Error('User data is not available');
  const userData = JSON.parse(userDataString);
  const { id: userId, role: userRole } = userData;

  const fetchPayments = async () => {
    try {
      const paymentsData = await invoke('fetch_payments', { userId: userId });
      setPayments(paymentsData);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    }
  };

  const handlePay = async (id) => {
    try {
      await invoke('pay_payment', { paymentId: { id } });
      alert('Счет успешно оплачен!');
      fetchPayments();
    } catch (error) {
      console.error('Ошибка при оплате счета:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Container>
      <Title order={1} pt={20} pb={20}>
        Список счетов
      </Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {/* <Table.Th>ID</Table.Th> */}
            {/* <Table.Th>Student ID</Table.Th> */}
            <Table.Th>Дата</Table.Th>
            <Table.Th>Тип</Table.Th>
            <Table.Th>Цена</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {payments.map((payment) => (
            <Table.Tr key={payment.id}>
              {/* <Table.Td>{payment.id}</Table.Td>
              <Table.Td>{payment.student_id}</Table.Td> */}
              <Table.Td>{payment.date}</Table.Td>
              <Table.Td>{TransliteType(payment.ptype)}</Table.Td>
              <Table.Td>{payment.amount.toString()}</Table.Td>
              <Table.Td>
                <button onClick={() => handlePay(payment.id)}>Оплатить</button>
              </Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentsList;
