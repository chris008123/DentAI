import Timeline from '@/components/common/Timeline'
import TreatmentPhaseCard from './TreatmentPhaseCard'

const STATUS_TO_DOT = { Recommended: 'active', Conditional: 'pending', Monitor: 'pending' }

export default function TreatmentTimeline({ phases = [] }) {
  const items = phases.map((phase) => ({
    title: phase.title,
    subtitle: phase.duration,
    status: STATUS_TO_DOT[phase.status] ?? 'pending',
    content: <TreatmentPhaseCard phase={phase} />,
  }))

  return <Timeline items={items} />
}
