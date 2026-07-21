import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'

export default function PatientsList() {
  return (
    <div>
      <PageHeader
        title="Patients"
        description="Search, filter, and manage your patient directory."
        actions={
          <Button icon={Plus} size="sm">
            New patient
          </Button>
        }
      />
      <Card>
        <Card.Body>
          <p className="text-sm text-text-secondary">
            The searchable, sortable, paginated patient table (built on the shared Table component)
            lands here in the next build phase.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
