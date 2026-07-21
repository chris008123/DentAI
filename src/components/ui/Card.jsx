export default function Card({ children, className = '', as: As = 'div', ...rest }) {
  return (
    <As
      className={`rounded-card border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`border-b border-border px-5 py-4 ${className}`}>{children}</div>
}

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`border-t border-border px-5 py-4 ${className}`}>{children}</div>
}
