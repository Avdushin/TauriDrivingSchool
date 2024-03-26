import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api/tauri';
import { Paths } from '../../App/Routing/Providers/types/Paths';
import { useNavigate } from 'react-router-dom';

function StudentLoginForm() {
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const result = await invoke('authenticate_user', { ...values });
      if (result) {
        //@ts-ignore
        localStorage.setItem('auth', true);
        // localStorage.setItem('user', JSON.stringify({ user: result }));
        Navigate(Paths.Home);
        alert('Login successful');
      } else {
        alert('Login failed: Incorrect email or password');
      }
    } catch (error) {
      alert(`Login error: ${error}`);
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
      <Button mt={20} type='submit'>
        Login
      </Button>
    </form>
  );
}

export default StudentLoginForm;
