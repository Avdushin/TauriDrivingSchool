import { Tooltip, UnstyledButton, rem } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './SideBar.module.scss';

export interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  href: string;
  active?: boolean;
  onClick?(): void;
}

export function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: NavbarLinkProps) {
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
