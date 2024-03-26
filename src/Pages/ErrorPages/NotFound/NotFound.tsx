import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Paths } from '../../../Components/App/Routing/Providers/types/Paths';
import image from '../../../assets/NotFound.svg';
import classes from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Ой! Что-то пошло не так</Title>
          <Text c='dimmed' size='lg'>
            Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
            ошиблись в вводе адреса или страница была перемещена на другой URL.
            Если вы считаете, что это ошибка, обратитесь в службу поддержки.
          </Text>

          <Link to={Paths.Home}>
            <Button
              variant='outline'
              size='md'
              mt='xl'
              className={classes.control}
            >
              Вернуться на главную страницу
            </Button>
          </Link>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default NotFound;
