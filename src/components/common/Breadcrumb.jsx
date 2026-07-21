import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function toLabel(segment) {
  if (/^[a-f0-9-]{6,}$/i.test(segment)) return 'Detail'
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link to="/dashboard" className="text-text-secondary hover:text-text">
        Home
      </Link>
      {segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/')
        const isLast = i === segments.length - 1
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-text-secondary" />
            {isLast ? (
              <span className="font-medium text-text">{toLabel(seg)}</span>
            ) : (
              <Link to={path} className="text-text-secondary hover:text-text">
                {toLabel(seg)}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
