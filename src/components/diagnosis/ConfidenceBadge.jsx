import Badge from '@/components/ui/Badge'
import { getConfidenceLevel } from '@/constants/status'

const TONE_BY_LEVEL = { high: 'success', medium: 'warning', low: 'neutral' }
const LABEL_BY_LEVEL = { high: 'High confidence', medium: 'Medium confidence', low: 'Low confidence' }

export default function ConfidenceBadge({ value }) {
  const level = getConfidenceLevel(value)
  return <Badge tone={TONE_BY_LEVEL[level]}>{LABEL_BY_LEVEL[level]}</Badge>
}
