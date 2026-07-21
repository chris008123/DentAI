import { ScanFace } from 'lucide-react'
import Card from '@/components/ui/Card'

/**
 * Placeholder for a real DICOM/NIfTI viewer. Props are shaped so a real
 * viewer library can be dropped in later without changing callers.
 */
export default function CBCTPreviewPanel({ fileName }) {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-sm font-medium text-text">CBCT preview</h3>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-bg py-16 text-center">
          <ScanFace className="h-8 w-8 text-text-secondary" />
          <div>
            <p className="text-sm font-medium text-text">Scan viewer coming soon</p>
            <p className="mt-1 text-xs text-text-secondary">
              {fileName ? `${fileName} — ` : ''}This panel is ready for a DICOM/NIfTI viewer integration.
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
