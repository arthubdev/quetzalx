import {
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Wallet,
  Server,
} from 'lucide-vue-next'

export const navigationItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Opportunities',
    to: '/opportunities',
    icon: TrendingUp,
  },
  {
    label: 'Trades',
    to: '/trades',
    icon: ArrowLeftRight,
  },
  {
    label: 'Wallets',
    to: '/wallets',
    icon: Wallet,
  },
  {
    label: 'System',
    to: '/system',
    icon: Server,
  },
  {
    label: 'Exchanges',
    to: '/exchanges',
    icon: Server,
  },
]