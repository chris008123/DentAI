import Table from '@/components/ui/Table'
import ConfidenceBadge from './ConfidenceBadge'
import ConfidenceBar from './ConfidenceBar'

const columns = [
  { key: 'name', header: 'Disease' },
  { key: 'confidence', header: 'Confidence', render: (row) => <ConfidenceBar value={row.confidence} /> },
  { key: 'level', header: 'Level', render: (row) => <ConfidenceBadge value={row.confidence} /> },
  { key: 'status', header: 'Status' },
]

export default function ResultsTable({ diseases = [], loading = false }) {
  return <Table columns={columns} data={diseases} loading={loading} emptyMessage="No findings returned." />
}
