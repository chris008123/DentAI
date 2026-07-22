import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import PatientTable from '@/components/patients/PatientTable'
import PatientForm from '@/components/patients/PatientForm'
import { useApi } from '@/hooks/useApi'
import { useDebounce } from '@/hooks/useDebounce'
import { PatientService } from '@/services/PatientService'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants/routes'

export default function PatientsList() {
  const navigate = useNavigate()
  const toast = useToast()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const debouncedSearch = useDebounce(search, 300)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' })

  const [formState, setFormState] = useState({ isOpen: false, patient: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isMutating, setIsMutating] = useState(false)

  const fetchPatients = useCallback(
    () => PatientService.list({ search: debouncedSearch, sort, page, pageSize: 5 }),
    [debouncedSearch, sort, page]
  )
  const { data, loading, refetch } = useApi(fetchPatients)

  const handleSortChange = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    )
  }

  const openCreate = () => setFormState({ isOpen: true, patient: null })
  const openEdit = (patient) => setFormState({ isOpen: true, patient })
  const closeForm = () => setFormState({ isOpen: false, patient: null })

  const handleFormSubmit = async (values) => {
    setIsMutating(true)
    try {
      if (formState.patient) {
        await PatientService.update(formState.patient.id, values)
        toast.success('Patient updated.')
      } else {
        await PatientService.create(values)
        toast.success('Patient created.')
      }
      closeForm()
      refetch()
    } catch (err) {
      toast.error(err.message || 'Unable to save patient.')
    } finally {
      setIsMutating(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsMutating(true)
    try {
      await PatientService.remove(deleteTarget.id)
      toast.success('Patient removed.')
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      toast.error(err.message || 'Unable to remove patient.')
    } finally {
      setIsMutating(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Patients"
        description="Search, filter, and manage your patient directory."
        actions={
          <Button icon={Plus} size="sm" onClick={openCreate}>
            New patient
          </Button>
        }
      />

      <Card>
        <Card.Header className="flex items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v)
              setPage(1)
            }}
            placeholder="Search patients…"
            className="max-w-xs"
          />
        </Card.Header>
        <Card.Body className="px-0 py-0">
          <div className="px-2">
            <PatientTable
              patients={data?.items ?? []}
              loading={loading}
              sort={sort}
              onSortChange={handleSortChange}
              onRowClick={(row) => navigate(ROUTES.PATIENT_PROFILE(row.id))}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
              pagination={
                data ? { page: data.page, pageCount: data.pageCount, onPageChange: setPage } : undefined
              }
            />
          </div>
        </Card.Body>
      </Card>

      <PatientForm
        isOpen={formState.isOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        initialValues={formState.patient}
        isSubmitting={isMutating}
      />

      <ConfirmationDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove patient"
        description={`Are you sure you want to remove ${deleteTarget?.name}? This can't be undone.`}
        confirmLabel="Remove"
        isLoading={isMutating}
      />
    </div>
  )
}
