import { forwardRef } from 'react'

const Textarea = forwardRef(function Textarea(
  { label, error, hint, id, rows = 4, className = '', ...rest },
  ref
) {
  const inputId = id || rest.name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={`resize-y rounded-lg border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-secondary
          outline-none transition-colors focus:border-accent
          ${error ? 'border-error' : 'border-border'} ${className}`}
        {...rest}
      />
      {error ? (
        <p className="text-xs text-error">{error}</p>
      ) : hint ? (
        <p className="text-xs text-text-secondary">{hint}</p>
      ) : null}
    </div>
  )
})

export default Textarea
