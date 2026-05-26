import jeffersonSantosPerfil from '../ativos/imagens/jefferson-santos-perfil.jpg'
import macacoPhpCapa from '../ativos/imagens/macacophp.png'

export const bangobalango = {
  alunoId: 'aluno-1',
// bangobalangoo: true,
}

export const modoApresentacao = {
  ativo: false,
}

export const usuarios = [
  {
    id: 'aluno-1',
    tipo: 'aluno',
    nome: 'Jefferson Santos',
    email: 'aluno@riseup.com',
    senha: 'Aluno@123',
    foto: 'JS',
    fotoUrl: jeffersonSantosPerfil,
    capaUrl: macacoPhpCapa,
    cargoAtual: 'Assistente administrativo',
    localizacao: 'Recife, PE',
    bio: 'Desenvolvedor Backend em transição de carreira, focada na construção de APIs robustas e escaláveis com Java e Spring Boot. Possuo domínio sólido nos fundamentos de HTTP e arquitetura REST, com foco constante em Clean Code e versionamento com Git/GitHub. Atualmente, aprofundo meus conhecimentos em DevOps (Docker e Cloud) e automação de testes (QA) para garantir entregas de alta qualidade e performance.',
    tecnologias: ['HTML', 'CSS', 'Logica', 'JavaScript'],
    certificados: ['Informática Essencial'],
  },
]
