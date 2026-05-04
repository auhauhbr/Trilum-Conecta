export function Avatar({ texto, grande = false, imagem }) {
  const className = grande ? 'avatar avatar-grande' : 'avatar'

  if (imagem) {
    return <img className={`${className} avatar-imagem`} src={imagem} alt="" />
  }

  return <span className={className}>{texto}</span>
}
