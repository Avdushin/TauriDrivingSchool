import { AdminPaths, Paths, PathsDashboard } from '../App/Routing/Providers/types/Paths';
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconLogin,
  IconCalendarTime,
  IconChessKing,
} from '@tabler/icons-react';

export const BarItems = [
  { icon: IconHome2, label: 'Главная', href: Paths.Home },
  { icon: IconChessKing, label: 'Панель администратора', href: AdminPaths.Panel },
  // { icon: IconTestPipe, label: 'Тестирование', href: PathsDashboard.Tests },
  // { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: Paths.Test },
  // { icon: IconCalendarStats, label: 'Releases', href: Paths.Test },
  { icon: IconUser, label: 'Аккаунт', href: Paths.Account },
  { icon: IconCalendarTime, label: 'Расписание', href: Paths.Timetable },
  { icon: IconSettings, label: 'Настройки', href: PathsDashboard.Settings },
  { icon: IconUser, label: 'Регистрация', href: Paths.Signup },
  { icon: IconLogin, label: 'Авторизация', href: Paths.Login },
];
