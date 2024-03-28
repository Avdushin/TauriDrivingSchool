import { FC } from 'react';
import { Card, Image, Text, Badge, Button, Group, Box } from '@mantine/core';

const AdminCard: FC = () => {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Box component='a' href=''>
        <Group justify='space-between' mt='md' mb='xs'>
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color='pink'>On Sale</Badge>
        </Group>

        <Text size='sm' c='dimmed'>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </Box>
    </Card>
  );
};

export default AdminCard;
