import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../App/Routing/Providers/types/Paths';


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
        <Stepper.Step label='First step' description='Profile settings'>
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
        </Stepper.Step>

        <Stepper.Step label='Second step' description='Personal information'>
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
          Completed! Form values:
          <Code block mt='xl'>
            {JSON.stringify(form.values, null, 2)}
          </Code>
          {/*//TODO Make production redirect */}
          
        </Stepper.Completed>
      </Stepper>

      <Group justify='flex-end' mt='xl'>
        {active !== 0 && (
          <Button variant='default' onClick={prevStep}>
            Back
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
