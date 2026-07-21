// Confidence thresholds for diagnosis results — the single source of truth
// consumed by ConfidenceBadge / ConfidenceBar so the logic never gets
// re-derived inside individual components.
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.75,
  MEDIUM: 0.45,
}

export const CONFIDENCE_LEVEL = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
}

export function getConfidenceLevel(value) {
  if (value >= CONFIDENCE_THRESHOLDS.HIGH) return CONFIDENCE_LEVEL.HIGH
  if (value >= CONFIDENCE_THRESHOLDS.MEDIUM) return CONFIDENCE_LEVEL.MEDIUM
  return CONFIDENCE_LEVEL.LOW
}

export const DIAGNOSIS_STAGE = {
  UPLOADING: 'uploading',
  PREPARING: 'preparing',
  PROCESSING: 'processing',
  GENERATING: 'generating',
  FINALIZING: 'finalizing',
  COMPLETE: 'complete',
  FAILED: 'failed',
}

export const DIAGNOSIS_STAGE_LABEL = {
  [DIAGNOSIS_STAGE.UPLOADING]: 'Uploading files',
  [DIAGNOSIS_STAGE.PREPARING]: 'Preparing data',
  [DIAGNOSIS_STAGE.PROCESSING]: 'Processing request',
  [DIAGNOSIS_STAGE.GENERATING]: 'Generating results',
  [DIAGNOSIS_STAGE.FINALIZING]: 'Finalizing',
}

export const REPORT_STATUS = {
  DRAFT: 'draft',
  GENERATED: 'generated',
  ARCHIVED: 'archived',
}

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}
