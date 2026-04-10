import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart2,
  User,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { ROLES } from '@/utils/constants'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [ROLES.ADMIN, ROLES.NGO, ROLES.INVESTIGATOR] },
  { to: '/my-cases', label: 'My Cases', icon: FolderOpen, roles: [ROLES.VICTIM] },
  { to: '/cases', label: 'Cases', icon: FolderOpen, roles: [ROLES.ADMIN, ROLES.NGO, ROLES.INVESTIGATOR] },
  {
    to: '/users',
    label: 'Users',
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    to: '/reports',
    label: 'Reports',
    icon: BarChart2,
    roles: [ROLES.ADMIN, ROLES.NGO],
  },
  { to: '/profile', label: 'Profile', icon: User, roles: null },
]

export default function Sidebar() {
  const { role } = useAuth()

  const visible = navItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  )

  return (
    <aside className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <span className="font-bold text-sidebar-foreground text-lg tracking-tight">
          Case Ledger
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {visible.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
