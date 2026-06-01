export function Campo({ label, helper, textarea = false, ...props }) {
  const Elemento = textarea ? 'textarea' : 'input'

  return (
    <label className="campo">
      <span>{label}</span>
      <Elemento {...props} />
      {helper && <small>{helper}</small>}
    </label>
  )
}
