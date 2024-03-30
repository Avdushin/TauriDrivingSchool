import { AdminPaths, Paths, PathsDashboard } from '../App/Routing/Providers/types/Paths';
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconCalendarTime,
  IconChessKing,
  IconInvoice,
} from '@tabler/icons-react';

// Определение элементов сайдбара
export const BarItems = [
  { icon: IconHome2, label: 'Главная', href: Paths.Home },
  { icon: IconChessKing, label: 'Панель администратора', href: AdminPaths.Panel, adminOnly: true },
  { icon: IconUser, label: 'Аккаунт', href: Paths.Account },
  { icon: IconCalendarTime, label: 'Расписание', href: Paths.Timetable },
  { icon: IconInvoice, label: 'Счета', href: Paths.Payment },
  { icon: IconSettings, label: 'Настройки', href: PathsDashboard.Settings },
  // { icon: IconUser, label: 'Регистрация', href: Paths.Signup },
  // { icon: IconLogin, label: 'Авторизация', href: Paths.Login },
];
