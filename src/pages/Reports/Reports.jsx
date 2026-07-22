import { useCallback, useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import SearchInput from '@/components/ui/SearchInput'
import ReportTable from '@/components/reports/ReportTable'
import ReportPreviewModal from '@/components/reports/ReportPreviewModal'
import { useApi } from '@/hooks/useApi'
import { useDebounce } from '@/hooks/useDebounce'
import { ReportService } from '@/services/ReportService'
import { useToast } from '@/hooks/useToast'

export default function Reports() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [page, setPage] = useState(1)

  const [previewId, setPreviewId] = useState(null)

  const fetchReports = useCallback(
    () => ReportService.list({ search: debouncedSearch, page, pageSize: 5 }),
    [debouncedSearch, page]
  )
  const { data, loading } = useApi(fetchReports)

  const fetchPreview = useCallback(() => (previewId ? ReportService.get(previewId) : Promise.resolve(null)), [
    previewId,
  ])
  const { data: previewReport, loading: previewLoading, refetch: refetchPreview } = useApi(fetchPreview, {
    immediate: false,
  })

  useEffect(() => {
    if (previewId) refetchPreview().catch(() => {})
  }, [previewId, refetchPreview])

  const handleDownload = (report) => {
    toast.success(`Downloading "${report.type}" for ${report.patientName}…`)
  }

  return (
    <div>
      <PageHeader title="Reports" description="Search, filter, generate, and download clinical reports." />

      <Card>
        <Card.Header>
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v)
              setPage(1)
            }}
            placeholder="Search by patient…"
            className="max-w-xs"
          />
        </Card.Header>
        <Card.Body className="px-0 py-0">
          <div className="px-2">
            <ReportTable
              reports={data?.items ?? []}
              loading={loading}
              onView={(row) => setPreviewId(row.id)}
              onDownload={handleDownload}
              pagination={
                data ? { page: data.page, pageCount: data.pageCount, onPageChange: setPage } : undefined
              }
            />
          </div>
        </Card.Body>
      </Card>

      <ReportPreviewModal
        isOpen={Boolean(previewId)}
        onClose={() => setPreviewId(null)}
        report={previewReport}
        loading={previewLoading}
      />
    </div>
  )
}
