import { FC } from 'react';
import { Box, Card, Group, Text } from '@mantine/core';

export interface AdminCardProps {
  title: string;
  description: string;
  href: string;
}

export const AdminCard: FC<AdminCardProps> = ({ title, description, href }) => {
  return (
    <Box component='a' href={href}>
      <Card mt={30} shadow='sm' padding='lg' radius='md' withBorder>
        <Group justify='space-between' mb='xs'>
          <Text fw={500}>{title}</Text>
        </Group>
        <Text size='sm' c='dimmed'>
          {description}
        </Text>
      </Card>
    </Box>
  );
};
