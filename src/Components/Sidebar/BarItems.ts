import { Paths, PathsDashboard } from '../App/Routing/Providers/types/Paths';
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconTestPipe,
} from '@tabler/icons-react';

export const BarItems = [
  { icon: IconHome2, label: 'Главная', href: Paths.Home },
  // { icon: IconTestPipe, label: 'Тестирование', href: PathsDashboard.Tests },
  // { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: Paths.Test },
  // { icon: IconCalendarStats, label: 'Releases', href: Paths.Test },
  { icon: IconUser, label: 'Аккаунт', href: PathsDashboard.Account },
  // { icon: IconFingerprint, label: 'Security', href: Paths.Test },
  { icon: IconSettings, label: 'Настройки', href: PathsDashboard.Settings },
];
