import mentorCompactado from '../../ativos/imagens/mentores/mentor-compactado.png'

export function MentorCompactadoButton({ onClick, posicao = 'direita', label = 'Abrir mentor' }) {
  return (
    <button
      type="button"
      className={`mentor-compactado mentor-compactado-${posicao}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <img src={mentorCompactado} alt="" aria-hidden="true" />
    </button>
  )
}
