import { useState } from 'react';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api/tauri';

function StudentLoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      const response = await invoke('authenticate_user', { ...values });
      if (response) {
        alert('Login successful!');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label='Email'
        placeholder='Email'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label='Password'
        placeholder='Password'
        {...form.getInputProps('password')}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}{' '}
      <Button mt={20} type='submit'>Login</Button>
    </form>
  );
}

export default StudentLoginForm;
