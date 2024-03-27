import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../App/Routing/Providers/types/Paths';
import useAuthStore from '../../../Store/authStore';

function StudentLoginForm() {
  const { login } = useAuthStore();
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await login(values.email, values.password);
      Navigate(Paths.Home);
      alert('Login successful');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
      <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
      <Button mt={20} type="submit">Login</Button>
    </form>
  );
}

export default StudentLoginForm;
