import Card from '@/components/ui/Card'
import Skeleton from '@/components/ui/Skeleton'

export default function SystemInfoSection({ info, loading }) {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-sm font-medium text-text">System information</h3>
      </Card.Header>
      <Card.Body className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading || !info ? (
          <>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-text-secondary">Version</p>
              <p className="mt-0.5 text-sm text-text">{info.version}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Environment</p>
              <p className="mt-0.5 text-sm text-text">{info.environment}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Last updated</p>
              <p className="mt-0.5 text-sm text-text">{info.lastUpdated}</p>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
