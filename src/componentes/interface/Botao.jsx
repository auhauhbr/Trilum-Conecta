import { Link } from 'react-router-dom'

export function Botao({ children, to, variant = 'primary', type = 'button', ...props }) {
  const className = `botao botao-${variant}`

  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  )
}
