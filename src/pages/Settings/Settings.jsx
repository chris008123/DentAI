import { useCallback, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import ProfileSection from '@/components/settings/ProfileSection'
import PasswordSection from '@/components/settings/PasswordSection'
import NotificationsSection from '@/components/settings/NotificationsSection'
import ThemeSection from '@/components/settings/ThemeSection'
import SystemInfoSection from '@/components/settings/SystemInfoSection'
import { useApi } from '@/hooks/useApi'
import { SettingsService } from '@/services/SettingsService'
import { useToast } from '@/hooks/useToast'

export default function Settings() {
  const toast = useToast()

  const fetchProfile = useCallback(() => SettingsService.getProfile(), [])
  const { data: profile, refetch: refetchProfile } = useApi(fetchProfile)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const fetchNotifications = useCallback(() => SettingsService.getNotificationPreferences(), [])
  const { data: notifications, refetch: refetchNotifications } = useApi(fetchNotifications)

  const fetchSystemInfo = useCallback(() => SettingsService.getSystemInfo(), [])
  const { data: systemInfo, loading: systemInfoLoading } = useApi(fetchSystemInfo)

  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const handleSaveProfile = async (values) => {
    setIsSavingProfile(true)
    try {
      await SettingsService.updateProfile(values)
      toast.success('Profile updated.')
      refetchProfile()
    } catch (err) {
      toast.error(err.message || 'Unable to update profile.')
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleSavePassword = async (values) => {
    setIsSavingPassword(true)
    try {
      await SettingsService.updatePassword(values)
      toast.success('Password updated.')
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleNotificationChange = async (next) => {
    try {
      await SettingsService.updateNotificationPreferences(next)
      refetchNotifications()
    } catch (err) {
      toast.error(err.message || 'Unable to update notification preferences.')
    }
  }

  return (
    <div>
      <PageHeader title="Settings" description="Profile, password, notifications, theme, and system info." />

      <div className="flex flex-col gap-6">
        <ProfileSection profile={profile} onSave={handleSaveProfile} isSaving={isSavingProfile} />
        <PasswordSection onSave={handleSavePassword} isSaving={isSavingPassword} />
        <NotificationsSection preferences={notifications} onChange={handleNotificationChange} />
        <ThemeSection />
        <SystemInfoSection info={systemInfo} loading={systemInfoLoading} />
      </div>
    </div>
  )
}
