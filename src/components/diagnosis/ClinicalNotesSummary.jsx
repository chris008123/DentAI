import Card from '@/components/ui/Card'

const FIELDS = [
  { key: 'chiefComplaint', label: 'Chief complaint' },
  { key: 'history', label: 'History' },
  { key: 'medicalHistory', label: 'Medical history' },
  { key: 'oralExamination', label: 'Oral examination' },
]

export default function ClinicalNotesSummary({ notes }) {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-sm font-medium text-text">Clinical notes</h3>
      </Card.Header>
      <Card.Body className="flex flex-col gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <p className="text-xs text-text-secondary">{label}</p>
            <p className="mt-0.5 text-sm text-text">{notes?.[key] || '—'}</p>
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}
