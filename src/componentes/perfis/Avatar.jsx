import { useState } from 'react'

export function Avatar({ texto, grande = false, imagem }) {
  const [imagemFalhou, setImagemFalhou] = useState(false)
  const className = grande ? 'avatar avatar-grande' : 'avatar'

  if (imagem && !imagemFalhou) {
    return <img className={`${className} avatar-imagem`} src={imagem} alt="" onError={() => setImagemFalhou(true)} />
  }

  return <span className={className}>{texto}</span>
}
