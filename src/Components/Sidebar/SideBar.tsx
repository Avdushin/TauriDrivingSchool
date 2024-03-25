import { FC } from 'react';
import { Center, Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { Paths } from '../App/Routing/Providers/types/Paths';
import { Link } from '../Shared/Link/Link';
import { useSidebarStore } from '../../Store/sidebarStore';
import { BarItems } from './BarItems';
import { NavbarLink } from './NavbarLink';
import classes from './SideBar.module.scss';
import logo from '../../assets/react.svg';

export const SideBar: FC = () => {
  const activeTab = useSidebarStore((state) => state.activeTab);
  const setActiveTab = useSidebarStore((state) => state.setActiveTab);

  const links = BarItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activeTab}
      onClick={() => setActiveTab(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Link to={Paths.Root}>
          <img src={logo} width={50} />
        </Link>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify='center' gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify='center' gap={0}>
        <NavbarLink icon={IconLogout} label='Logout' href={Paths.Logout} />
      </Stack>
    </nav>
  );
};
