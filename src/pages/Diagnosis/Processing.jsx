import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import ProcessingStages from '@/components/diagnosis/ProcessingStages'
import { DiagnosisService } from '@/services/DiagnosisService'
import { usePolling } from '@/hooks/usePolling'
import { useToast } from '@/hooks/useToast'
import { DIAGNOSIS_STAGE } from '@/constants/status'
import { ROUTES } from '@/constants/routes'

export default function Processing() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const fetchStatus = useCallback(() => DiagnosisService.getStatus(sessionId), [sessionId])
  const isComplete = useCallback((result) => result?.stage === DIAGNOSIS_STAGE.COMPLETE, [])

  const { data, error } = usePolling(fetchStatus, {
    intervalMs: 600,
    stopWhen: isComplete,
  })

  useEffect(() => {
    if (data?.stage === DIAGNOSIS_STAGE.COMPLETE) {
      navigate(ROUTES.DIAGNOSIS_RESULT(sessionId), { replace: true })
    }
  }, [data, navigate, sessionId])

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Unable to check diagnosis status.')
      navigate(ROUTES.NEW_DIAGNOSIS, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div>
      <PageHeader
        title="Processing diagnosis"
        description="This usually takes under a minute — you can leave this page and come back."
      />
      <Card>
        <Card.Body>
          <ProcessingStages currentStage={data?.stage} progress={data?.progress ?? 0} />
        </Card.Body>
      </Card>
    </div>
  )
}
