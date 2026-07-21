import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" description="Search, filter, generate, and download clinical reports." />
      <Card>
        <Card.Body>
          <p className="text-sm text-text-secondary">
            The reports table and preview modal land here once ReportService is wired up.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
