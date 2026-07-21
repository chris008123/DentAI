import Card from '@/components/ui/Card'
import Textarea from '@/components/ui/Textarea'

export default function ClinicalNotesForm({ register, errors }) {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-sm font-medium text-text">Clinical notes</h3>
      </Card.Header>
      <Card.Body className="flex flex-col gap-4">
        <Textarea
          label="Chief complaint"
          placeholder="What brings the patient in today?"
          error={errors.chiefComplaint?.message}
          {...register('chiefComplaint')}
        />
        <Textarea label="History" placeholder="Relevant dental history" {...register('history')} />
        <Textarea
          label="Medical history"
          placeholder="Relevant medical history, medications, allergies"
          {...register('medicalHistory')}
        />
        <Textarea
          label="Oral examination"
          placeholder="Clinical findings from the oral exam"
          {...register('oralExamination')}
        />
      </Card.Body>
    </Card>
  )
}
