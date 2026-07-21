import { useParams } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

export default function PatientProfile() {
  const { id } = useParams()

  return (
    <div>
      <PageHeader title="Patient profile" description={`Patient ID: ${id}`} />
      <Card>
        <Card.Body>
          <p className="text-sm text-text-secondary">
            Patient information, diagnosis history, treatment plans, reports, visit timeline, and
            clinical notes will render here once PatientService is wired up.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
