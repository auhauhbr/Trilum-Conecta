export function Campo({ label, textarea = false, ...props }) {
  const Elemento = textarea ? 'textarea' : 'input'

  return (
    <label className="campo">
      <span>{label}</span>
      <Elemento {...props} />
    </label>
  )
}
