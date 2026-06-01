import jeffersonSantosPerfil from '../ativos/imagens/jefferson-santos-perfil.jpg'
import macacoPhpCapa from '../ativos/imagens/macacophp.png'

export const bangobalango = {
  alunoId: 'aluno-1',
}

export const modoApresentacao = {
  ativo: false,
}

export const usuarios = [
  {
    id: 'aluno-1',
    tipo: 'aluno',
    nome: 'Jefferson Santos',
    foto: 'JS',
    fotoUrl: jeffersonSantosPerfil,
    capaUrl: macacoPhpCapa,
    cargoAtual: 'Assistente administrativo',
    localizacao: 'Recife, PE',
    bio: 'Desenvolvedor Backend em transição de carreira, focado na construção de APIs robustas e escaláveis com Java e Spring Boot. Possui domínio sólido nos fundamentos de HTTP e arquitetura REST, com foco constante em Clean Code e versionamento com Git/GitHub. Atualmente, aprofunda conhecimentos em DevOps, Docker, Cloud e automação de testes para garantir entregas de alta qualidade e performance.',
    tecnologias: ['HTML', 'CSS', 'Lógica', 'JavaScript'],
    certificados: ['Informática Essencial'],
  },
]
