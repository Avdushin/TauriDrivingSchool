import { useMantineColorScheme, Button, Flex } from '@mantine/core';

export const ThemeSwithcer = () => {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Flex
      mih={50}
      align='center'
      wrap='wrap'
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'xs', sm: 'xs' }}
      justify={{ base: 'center', sm: 'flex-start' }}
    >
      <Button w={'35%'} onClick={() => setColorScheme('dark')}>
        Тёмная
      </Button>
      <Button w={'35%'} onClick={() => setColorScheme('light')}>
        Светлая
      </Button>
      <Button w={'35%'} onClick={() => setColorScheme('auto')}>
        Автоматически
      </Button>
    </Flex>
  );
};