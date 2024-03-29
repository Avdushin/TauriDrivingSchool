import { useForm } from '@mantine/form';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../App/Routing/Providers/types/Paths';
import useAuthStore from '../../../Store/authStore';
import { Link } from '../../Shared/Link/Link';

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
    const { success, error } = await login(values.email, values.password);
    if (success) {
      Navigate(Paths.Home);
      alert('Login successful');
    } else {
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction={'column'}>
          <TextInput
            label='Email'
            placeholder='Email'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label='Пароль'
            placeholder='Пароль'
            {...form.getInputProps('password')}
          />
          <Button mt={20} type='submit'>
            Войти
          </Button>
        </Flex>
      </form>
      <Text pt={20}>
        Ещё нет аккаунта? <Link to={Paths.Signup}>Зарегистрируйтесь!</Link>
      </Text>
    </>
  );
}

export default StudentLoginForm;
