import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import LoadingOverlay from '@/components/ui/LoadingOverlay'
import { formatDate } from '@/utils/dateFormatter'

const STATUS_TONE = { generated: 'success', draft: 'warning', archived: 'neutral' }

export default function ReportPreviewModal({ isOpen, onClose, report, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report preview" size="lg" footer={<Button onClick={onClose}>Close</Button>}>
      {loading || !report ? (
        <LoadingOverlay label="Loading report…" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-base font-medium text-text">{report.type}</h3>
              <p className="mt-0.5 text-sm text-text-secondary">
                {report.patientName} · {formatDate(report.date)}
              </p>
            </div>
            <Badge tone={STATUS_TONE[report.status] ?? 'neutral'}>{report.status}</Badge>
          </div>
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-sm text-text-secondary">{report.summary}</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
