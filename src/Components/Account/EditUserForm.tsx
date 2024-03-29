//@ts-nocheck
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';

export const EditUserForm = ({ initialValues, onSave, onCancel }: any) => {
  const form = useForm({
    initialValues,
  });

  return (
    <form onSubmit={form.onSubmit(onSave)}>
      <TextInput
        label='Имя пользователя'
        {...form.getInputProps('username')}
        required
      />
      <TextInput
        label='Электронная почта'
        {...form.getInputProps('email')}
        required
      />
      <TextInput label='Телефон' {...form.getInputProps('phone')} maxLength={11} />
      <PasswordInput
        label='Новый пароль'
        {...form.getInputProps('password')}
        placeholder='Оставьте пустым, чтобы не изменять'
      />
      <Group position='right' mt='md'>
        <Button type='submit'>Сохранить</Button>
        <Button type='button' onClick={onCancel}>
          Отмена
        </Button>
      </Group>
    </form>
  );
};
