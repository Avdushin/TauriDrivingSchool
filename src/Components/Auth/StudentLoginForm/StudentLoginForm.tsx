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

  const handleSubmit = async (values) => {
    const { success, error } = await login(values.email, values.password);
    if (success) {
      Navigate(Paths.Home);
      alert('Login successful');
    } else {
      alert(`Login failed: ${error}`);
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
