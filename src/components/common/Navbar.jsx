import { Menu, Bell, User, Settings, LogOut } from 'lucide-react'
import Breadcrumb from './Breadcrumb'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function Navbar({ onOpenMobileSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open menu"
          className="text-text-secondary hover:text-text lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumb />
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-text"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-surface-hover">
              <Avatar name={user?.name} size="sm" />
              <span className="hidden text-sm font-medium text-text sm:inline">{user?.name}</span>
            </button>
          }
        >
          <Dropdown.Item icon={User} onClick={() => navigate(ROUTES.SETTINGS)}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item icon={Settings} onClick={() => navigate(ROUTES.SETTINGS)}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item icon={LogOut} danger onClick={logout}>
            Logout
          </Dropdown.Item>
        </Dropdown>
      </div>
    </header>
  )
}
