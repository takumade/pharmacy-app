import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User, User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Money as MoneyIcon } from '@phosphor-icons/react/dist/ssr/Money';
import { ShoppingBag as ShoppingBagIcon } from '@phosphor-icons/react/dist/ssr/ShoppingBag';
import { Pill as PillIcon } from '@phosphor-icons/react/dist/ssr/Pill';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Article, FirstAid, Prescription } from '@phosphor-icons/react/dist/ssr';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'shopping-bag': ShoppingBagIcon,
  'pescription': Prescription,
  'applications': Article,
  'pharmacy': FirstAid,
  'money': MoneyIcon,
  'pill': PillIcon,
  'x-square': XSquare,
  'user': UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
