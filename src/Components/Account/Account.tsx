import { FC, useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Divider,
  TextInput,
  PasswordInput,
  Button,
  Group,
} from '@mantine/core';
import useAuthStore, { UserData } from '../../Store/authStore';
import { useForm } from '@mantine/form';
import { EditUserForm } from './EditUserForm';

const TransliteRole = (role: string) => {
  switch (role) {
    case 'administrator':
      return 'Администратор';
    case 'teacher':
      return 'Учитель';
    case 'student':
      return 'Студент';
    default:
      return role;
  }
};

const Account: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { user, fetchAndSetUserData, updateUser } = useAuthStore();

  useEffect(() => {
    fetchAndSetUserData();
  }, []);

  const form = useForm({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '', // Пароль не отображаем, но предоставляем возможность изменения
    },
  });

  const handleSave = async (values: typeof form.values) => {
    // Обновляем только те поля, которые были изменены пользователем
    const success = await updateUser(
      values.username,
      values.email,
      values.phone,
      values.password.trim() ? values.password : undefined
    );
    if (success) {
      setEditMode(false);
      fetchAndSetUserData();
    }
  };

  return (
    <Container pt={20}>
      <Title>Личный кабинет</Title>
      <Divider size={2} pt={10} />
      {user && (
        <>
          {editMode ? (
            <EditUserForm
              initialValues={{
                username: user?.username || '',
                email: user?.email || '',
                phone: user?.phone || '',
                password: '',
              }}
              onSave={async (values) => {
                const success = await updateUser(
                  values.username,
                  values.email,
                  values.phone,
                  values.password.trim() ? values.password : undefined
                );
                if (success) {
                  setEditMode(false);
                  fetchAndSetUserData();
                }
              }}
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <>
              <Text size='lg'>
                Имя пользователя: {user.username}
                <br />
                Почта: {user.email}
                <br />
                Роль: {TransliteRole(user.role)}
                {user.role === 'student' && (
                  <>
                    <br />
                    Группа: {user.group_name}
                  </>
                )}
              </Text>
              <Button mt='md' onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Account;
