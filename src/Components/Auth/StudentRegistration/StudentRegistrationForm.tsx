import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Box,
  Text,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../App/Routing/Providers/types/Paths';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from '../../Shared/Link/Link';

function StudentRegistrationForm() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 6
              ? 'Password must include at least 6 characters'
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }
      return {};
    },
  });

  const nextStep = async () => {
    //@ts-ignore
    if (form.isInvalid) return;
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    try {
      await invoke('register_student', { values: form.values });
      alert('Registration successful!');
      navigate(Paths.Login);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step
          label='Аутентификация'
          description='Аутентификационные данные'
        >
          <TextInput
            label='Username'
            placeholder='Username'
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label='Password'
            placeholder='Password'
            {...form.getInputProps('password')}
          />
          <Text pt={20}>
            Уже есть аккаунт? {''}
            <Link to={Paths.Login}>Войдите!</Link>
          </Text>
        </Stepper.Step>

        <Stepper.Step label='Контакты' description='Контактная информация'>
          <TextInput
            label='Email'
            placeholder='Email'
            {...form.getInputProps('email')}
          />
          <TextInput
            label='Phone (optional)'
            placeholder='Your phone number'
            {...form.getInputProps('phone')}
          />
        </Stepper.Step>

        <Stepper.Completed>
          {/* Completed! Form values:
          <Code block mt='xl'>
            {JSON.stringify(form.values, null, 2)}
          </Code>
           */}
          <Flex gap={20} justify='center'>
            <IconCircleCheck color='green' />
            <Text>
              После нажатия на кнопку "
              <Link onClick={handleSubmit}>Зарегистрироваться</Link>", ваш
              аккаунт будет создан!
            </Text>
          </Flex>
        </Stepper.Completed>
      </Stepper>

      <Group justify='flex-end' mt='xl'>
        {active !== 0 && (
          <Button variant='default' onClick={prevStep}>
            Назад
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Далее</Button>}
        {active === 2 && (
          <Button onClick={handleSubmit}>Зарегистрироваться</Button>
        )}
      </Group>
    </>
  );
}

export default StudentRegistrationForm;
