// @ts-nocheck
import { Tooltip, UnstyledButton, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './SideBar.module.scss';
import { useAuthStore } from '../../Store';

export interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  href: string;
  active?: boolean;
  onClick?(): void;
  adminOnly?: boolean;
}

export function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
  adminOnly = false,
}: NavbarLinkProps) {
  const { user } = useAuthStore();

  // Проверяем, является ли пользователь администратором
  const isAdmin = user?.role === 'administrator';

  // Проверяем, должен ли элемент сайдбара быть отображен для данного пользователя
  const shouldRender = adminOnly ? isAdmin : true;

  // Если элемент сайдбара должен быть скрыт, возвращаем null
  if (!shouldRender) {
    return null;
  }

  return (
    <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </Link>
      </UnstyledButton>
    </Tooltip>
  );
}
