import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Profile, password, notifications, theme, and system info." />
      <Card>
        <Card.Body>
          <p className="text-sm text-text-secondary">
            Settings forms (with React Hook Form + Zod validation) land here once SettingsService is
            wired up.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
