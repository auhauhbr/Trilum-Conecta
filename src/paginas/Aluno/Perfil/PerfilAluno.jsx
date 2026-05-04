import { Award, BriefcaseBusiness, Camera, ChevronDown, Download, ExternalLink, GraduationCap, LogOut, Pencil, Save, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'
import { cursos } from '../../../dados/cursos'
import { trilhas } from '../../../dados/trilhas'
import { baixarCertificadoPdf } from '../../../servicos/certificados'
import { cursoComoConteudo } from '../../../servicos/conteudosCurso'
import { calcularProgresso } from '../../../servicos/recomendacoes'

function rotuloTecnologia(tecnologia) {
  const rotulos = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    go: 'Go',
    react: 'React',
    node: 'Node.js',
    sql: 'SQL',
    'git-github': 'Git/GitHub',
    'docker-cloud': 'Docker/Cloud',
    informatica: 'Informática',
    logica: 'Lógica',
    qa: 'QA',
    carreira: 'Carreira',
    ingles: 'Inglês',
  }

  return rotulos[tecnologia] || tecnologia
}

function professorDaTrilha(trilha) {
  const professores = [
    ...trilha.modulos.flatMap((modulo) => modulo.aulas || []).map((aula) => aula.professor).filter(Boolean),
    ...cursos.filter((curso) => curso.trilhaIds?.includes(trilha.id)).map((curso) => curso.professor).filter(Boolean),
  ]
  return [...new Set(professores)].join(', ') || 'Professores externos'
}

function calcularTecnologiasEstudadas(progressoCursos) {
  const mapa = new Map()

  function somar(tecnologia, pontos, total) {
    if (!tecnologia) return
    const atual = mapa.get(tecnologia) || { tecnologia, assistidas: 0, total: 0 }
    mapa.set(tecnologia, {
      ...atual,
      assistidas: atual.assistidas + pontos,
      total: atual.total + total,
    })
  }

  trilhas.forEach((trilha) => {
    const aulas = trilha.modulos.flatMap((modulo) => modulo.aulas)
    const assistidas = aulas.filter((aula) => progressoCursos[aula.id]).length
    trilha.tecnologias?.forEach((tecnologia) => somar(tecnologia, assistidas, aulas.length))
  })

  cursos.forEach((curso) => {
    const conteudo = cursoComoConteudo(curso)
    const aulas = conteudo.modulos.flatMap((modulo) => modulo.aulas)
    const assistidas = aulas.filter((aula) => progressoCursos[aula.id]).length
    somar(curso.tecnologia, assistidas, aulas.length)
  })

  return [...mapa.values()]
    .map((item) => ({
      ...item,
      rotulo: rotuloTecnologia(item.tecnologia),
      percentual: item.total ? Math.round((item.assistidas / item.total) * 100) : 0,
    }))
    .filter((item) => item.percentual > 0)
    .sort((a, b) => b.percentual - a.percentual)
    .slice(0, 6)
}

export function PerfilAluno() {
  const navigate = useNavigate()
  const { usuarioAtual, respostasWizard, progressoCursos, candidaturas, vagasEmpresa, atualizarAluno, logout } = useApp()
  const nome = usuarioAtual?.nome || 'Aluno RiseUp'
  const partesNome = nome.split(' ')
  const formInicial = {
    primeiroNome: partesNome[0] || nome,
    sobrenome: partesNome.slice(1).join(' '),
    titulo: usuarioAtual?.titulo || respostasWizard.areaDesejada || 'Estudante de tecnologia',
    bio: usuarioAtual?.bio || 'Adicione uma biografia para completar seu perfil público.',
    tecnologias: (usuarioAtual?.tecnologias || []).join(', '),
    foto: usuarioAtual?.foto || nome.slice(0, 2).toUpperCase(),
    fotoUrl: usuarioAtual?.fotoUrl || '',
  }
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(formInicial)
  const alterado = JSON.stringify(form) !== JSON.stringify(formInicial)
  const trilhasComProgresso = trilhas
    .map((trilha) => ({ ...trilha, progresso: calcularProgresso(trilha, progressoCursos) }))
    .filter((trilha) => trilha.progresso > 0)
  const cursosComProgresso = cursos
    .map((curso) => {
      const conteudo = cursoComoConteudo(curso)
      return { ...curso, progresso: calcularProgresso(conteudo, progressoCursos) }
    })
    .filter((curso) => curso.progresso > 0)
  const certificadosPersonalizados = (usuarioAtual?.certificados || []).map((titulo, index) => {
    const trilhaEncontrada = trilhas.find((trilha) => trilha.titulo === titulo)
    const cursoEncontrado = cursos.find((curso) => curso.titulo === titulo)

    if (trilhaEncontrada) {
      return {
        id: trilhaEncontrada.id,
        titulo,
        tipo: 'Trilha',
        duracao: trilhaEncontrada.duracao,
        professor: professorDaTrilha(trilhaEncontrada),
        progresso: trilhaEncontrada.progresso || 100,
        personalizado: true,
      }
    }

    if (cursoEncontrado) {
      return {
        id: cursoEncontrado.id,
        titulo,
        tipo: 'Curso',
        duracao: cursoEncontrado.duracao,
        professor: cursoEncontrado.professor,
        progresso: 100,
        personalizado: true,
      }
    }

    return {
      id: `perfil-certificado-${index}`,
      titulo,
      tipo: 'Certificado',
      duracao: 'Carga horária simulada',
      professor: 'RiseUp',
      progresso: 100,
      personalizado: true,
    }
  })
  const certificadoDemoCurso = {
    id: 'curso-html-css-js',
    titulo: 'HTML, CSS e JavaScript para primeiras telas',
    tipo: 'Curso',
    duracao: '12h30',
    professor: 'Matheus Battisti, Diego e Jhonatan de Souza',
    progresso: 100,
  }
  const certificados = [
    ...certificadosPersonalizados,
    certificadoDemoCurso,
    ...trilhasComProgresso
      .filter((trilha) => trilha.progresso >= 80)
      .map((trilha) => ({
        id: trilha.id,
        titulo: trilha.titulo,
        tipo: 'Trilha',
        duracao: trilha.duracao,
        professor: professorDaTrilha(trilha),
        progresso: trilha.progresso,
      })),
    ...cursosComProgresso
      .filter((curso) => curso.progresso >= 100)
      .map((curso) => ({
        id: curso.id,
        titulo: curso.titulo,
        tipo: 'Curso',
        duracao: curso.duracao,
        professor: curso.professor,
        progresso: curso.progresso,
      })),
  ].filter((certificado, indice, lista) => lista.findIndex((item) => item.titulo === certificado.titulo) === indice)
  const tecnologiasEstudadas = calcularTecnologiasEstudadas(progressoCursos)

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function selecionarFoto(evento) {
    const arquivo = evento.target.files?.[0]
    if (!arquivo) return

    const leitor = new FileReader()
    leitor.onload = () => atualizar('fotoUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function cancelarEdicao() {
    setForm(formInicial)
    setEditando(false)
  }

  function salvarPerfil() {
    if (!alterado) return
    atualizarAluno({
      nome: `${form.primeiroNome} ${form.sobrenome}`.trim(),
      titulo: form.titulo,
      bio: form.bio,
      foto: form.foto,
      fotoUrl: form.fotoUrl,
      tecnologias: form.tecnologias
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    setEditando(false)
  }

  function sair() {
    logout()
    navigate('/')
  }

  return (
    <section className="perfil-udemy-page">
      <aside className="perfil-udemy-sidebar">
        <div className="perfil-foto-wrap">
          <Avatar texto={form.foto || nome.slice(0, 2).toUpperCase()} imagem={form.fotoUrl} grande />
          {editando && (
            <label className="perfil-foto-botao">
              <Camera size={16} />
              <input accept="image/*" type="file" onChange={selecionarFoto} />
            </label>
          )}
        </div>
        <strong>{`${form.primeiroNome} ${form.sobrenome}`.trim()}</strong>
        <nav>
          <a href="#perfil-publico">Visualizar perfil público</a>
          <a className="ativo" href="#dados-basicos">Perfil</a>
          <a href="#aprendizado">Aprendizado</a>
          <a href="#certificados">Certificados</a>
          <a href="#candidaturas">Candidaturas</a>
          <Link to="/aluno/questionario">Editar Wizard</Link>
          <button className="perfil-sidebar-sair" type="button" onClick={sair}>
            <LogOut size={15} /> Sair
          </button>
        </nav>
      </aside>

      <main className="perfil-udemy-conteudo">
        <header className="perfil-udemy-header" id="perfil-publico">
          <div>
            <h1>Perfil público</h1>
            <p>Adicione informações sobre você</p>
          </div>
          <div className="perfil-edicao-acoes">
            {editando ? (
              <>
                {alterado && (
                  <button className="botao botao-secondary" type="button" onClick={cancelarEdicao}>
                    <X size={17} /> Cancelar
                  </button>
                )}
                <button className="botao botao-primary" type="button" disabled={!alterado} onClick={salvarPerfil}>
                  <Save size={17} /> Salvar
                </button>
              </>
            ) : (
              <button className="botao botao-primary" type="button" onClick={() => setEditando(true)}>
                <Pencil size={17} /> Editar perfil
              </button>
            )}
          </div>
        </header>

        <section className="perfil-udemy-form" id="dados-basicos">
          <h2>Dados básicos:</h2>
          <div className="perfil-campo-grid">
            <input
              aria-label="Primeiro nome"
              readOnly={!editando}
              value={form.primeiroNome}
              onChange={(evento) => atualizar('primeiroNome', evento.target.value)}
            />
            <input
              aria-label="Sobrenome"
              readOnly={!editando}
              value={form.sobrenome}
              onChange={(evento) => atualizar('sobrenome', evento.target.value)}
            />
            <div className="perfil-input-contador">
              <input
                aria-label="Profissão ou título"
                maxLength={60}
                readOnly={!editando}
                value={form.titulo}
                onChange={(evento) => atualizar('titulo', evento.target.value)}
              />
              <span>60</span>
            </div>
            <small>Adicione um título profissional, como "Desenvolvedor Front-end Júnior" ou "Estudante de tecnologia".</small>
            <input
              aria-label="Interesses"
              placeholder="Interesses separados por vírgula"
              readOnly={!editando}
              value={form.tecnologias}
              onChange={(evento) => atualizar('tecnologias', evento.target.value)}
            />
            <small>Use vírgulas para adicionar interesses, por exemplo: React, Python, QA.</small>
          </div>

          <label className="perfil-editor">
            <span>Biografia</span>
            <textarea
              aria-label="Biografia"
              readOnly={!editando}
              value={form.bio}
              onChange={(evento) => atualizar('bio', evento.target.value)}
            />
          </label>
        </section>

        <section className="perfil-udemy-form perfil-metricas-bloco" id="aprendizado">
          <h2>Aprendizado</h2>
          <div className="metricas perfil-metricas-udemy">
            <article>
              <GraduationCap />
              <strong>{trilhasComProgresso.length + cursosComProgresso.length}</strong>
              <span>Conteúdos iniciados</span>
            </article>
            <article>
              <Award />
              <strong>{certificados.length}</strong>
              <span>Certificados</span>
            </article>
            <article>
              <BriefcaseBusiness />
              <strong>{candidaturas.length}</strong>
              <span>Candidaturas</span>
            </article>
          </div>

          <div className="perfil-duas-colunas">
            <section className="perfil-subcard">
              <h3>Cursos em andamento</h3>
              {[...trilhasComProgresso, ...cursosComProgresso].length ? (
                [...trilhasComProgresso, ...cursosComProgresso].map((conteudo) => (
                  <div className="linha-progresso" key={conteudo.id}>
                    <strong>{conteudo.titulo}</strong>
                    <span>{conteudo.progresso}%</span>
                    <div className="progresso">
                      <span style={{ width: `${conteudo.progresso}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum curso iniciado ainda.</p>
              )}
            </section>

            <section className="perfil-subcard">
              <h3>Tecnologias estudadas</h3>
              {tecnologiasEstudadas.length ? (
                <div className="grafico-tecnologias">
                  {tecnologiasEstudadas.map((item) => (
                    <div className="barra-tecnologia" key={item.tecnologia}>
                      <span>{item.rotulo}</span>
                      <div>
                        <strong style={{ width: `${item.percentual}%` }} />
                      </div>
                      <small>{item.percentual}%</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Quando você marcar aulas como concluídas, o gráfico aparece aqui.</p>
              )}
            </section>
          </div>
        </section>

        <section className="perfil-udemy-form" id="certificados">
          <h2>Certificados</h2>
          <div className="perfil-certificados-destaque">
            <div>
              <strong>{certificados.length}</strong>
              <span>Certificados ativos no perfil</span>
            </div>
            <p>
              {certificados.length
                ? 'Veja abaixo os certificados adicionados ao seu perfil e os gerados a partir de cursos ou trilhas concluídas.'
                : 'Ainda não há certificados no seu perfil. Conclua uma trilha ou curso para liberar o primeiro certificado.'}
            </p>
          </div>
          {certificados.length ? (
            <div className="certificados-lista">
              {certificados.map((certificado) => (
                <details className="certificado-expansivel" key={`${certificado.tipo}-${certificado.id}`}>
                  <summary>
                    <strong>{certificado.titulo}</strong>
                    <ChevronDown size={20} />
                  </summary>
                  <div className="certificado-detalhes">
                    <span>Professor: {certificado.professor}</span>
                    <span>Carga horária: {certificado.duracao}</span>
                    <span>Conclusão: {certificado.progresso}%</span>
                    <div className="certificado-acoes">
                      {certificado.id ? (
                        <Link className="botao botao-secondary" to={`/aluno/cursos/${certificado.id}`}>
                          <ExternalLink size={17} /> Ir para o curso
                        </Link>
                      ) : (
                        <button className="botao botao-secondary" type="button" disabled>
                          <ExternalLink size={17} /> Ir para o curso
                        </button>
                      )}
                      <button
                        className="botao botao-primary"
                        type="button"
                        onClick={() =>
                          baixarCertificadoPdf({
                            aluno: usuarioAtual?.nome,
                            curso: certificado.titulo,
                            professor: certificado.professor,
                            horas: certificado.duracao,
                          })
                        }
                      >
                        <Download size={17} /> Baixar PDF
                      </button>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p>Certificados aparecem quando uma trilha chega a 80% ou quando um curso da plataforma é concluído.</p>
          )}
        </section>

        <section className="perfil-udemy-form" id="candidaturas">
          <h2>Candidaturas</h2>
          {candidaturas.length ? (
            candidaturas.map((candidatura) => {
              const vaga = vagasEmpresa.find((item) => item.id === candidatura.vagaId)
              return (
                <div className="candidatura-item" key={candidatura.id}>
                  <strong>{vaga?.titulo}</strong>
                  <span>{candidatura.status}</span>
                  <small>Última atualização: {candidatura.atualizadoEm}</small>
                </div>
              )
            })
          ) : (
            <p>Nenhuma candidatura registrada ainda.</p>
          )}
        </section>
      </main>
    </section>
  )
}
