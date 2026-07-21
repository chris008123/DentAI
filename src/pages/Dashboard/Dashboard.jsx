import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="A quick overview of clinical activity." />
      <Card>
        <Card.Body>
          <p className="text-sm text-text-secondary">
            Statistics cards, the recent diagnoses table, quick actions, recent reports, and system status
            will render here once their services are wired up in the next build phase.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
