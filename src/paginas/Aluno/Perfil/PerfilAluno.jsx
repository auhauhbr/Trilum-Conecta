import { ArrowLeft, Award, BriefcaseBusiness, Camera, Download, GraduationCap, LogOut, Pencil, Save, X } from 'lucide-react'
import { useRef, useState } from 'react'
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
    ...trilha.modulos.flatMap((m) => m.aulas || []).map((a) => a.professor).filter(Boolean),
    ...cursos.filter((c) => c.trilhaIds?.includes(trilha.id)).map((c) => c.professor).filter(Boolean),
  ]
  return [...new Set(professores)].join(', ') || 'Professores externos'
}

function calcularTecnologiasEstudadas(progressoCursos) {
  const mapa = new Map()

  function somar(tecnologia, pontos, total) {
    if (!tecnologia) return
    const atual = mapa.get(tecnologia) || { tecnologia, assistidas: 0, total: 0 }
    mapa.set(tecnologia, { ...atual, assistidas: atual.assistidas + pontos, total: atual.total + total })
  }

  trilhas.forEach((trilha) => {
    const aulas = trilha.modulos.flatMap((m) => m.aulas)
    const assistidas = aulas.filter((a) => progressoCursos[a.id]).length
    trilha.tecnologias?.forEach((t) => somar(t, assistidas, aulas.length))
  })

  cursos.forEach((curso) => {
    const conteudo = cursoComoConteudo(curso)
    const aulas = conteudo.modulos.flatMap((m) => m.aulas)
    const assistidas = aulas.filter((a) => progressoCursos[a.id]).length
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

  const nome = usuarioAtual?.nome || 'Aluno Trilum Conecta'
  const partesNome = nome.split(' ')

  const formInicial = {
    primeiroNome: partesNome[0] || nome,
    sobrenome: partesNome.slice(1).join(' '),
    titulo: usuarioAtual?.titulo || respostasWizard.areaDesejada || 'Estudante de tecnologia',
    bio: usuarioAtual?.bio || 'Adicione uma biografia para completar seu perfil público.',
    tecnologias: (usuarioAtual?.tecnologias || []).join(', '),
    foto: usuarioAtual?.foto || nome.slice(0, 2).toUpperCase(),
    fotoUrl: usuarioAtual?.fotoUrl || '',
    capaUrl: usuarioAtual?.capaUrl || '',
  }

  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(formInicial)
  const [isDragging, setIsDragging] = useState(false)

  const refCursosScroll = useRef(null)
  const refCertificadosScroll = useRef(null)
  const dragState = useRef({ isDragging: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 })

  const alterado = JSON.stringify(form) !== JSON.stringify(formInicial)
  const nomeCompleto = `${form.primeiroNome} ${form.sobrenome}`.trim()

  const trilhasComProgresso = trilhas
    .map((t) => ({ ...t, progresso: calcularProgresso(t, progressoCursos) }))
    .filter((t) => t.progresso > 0)

  const cursosComProgresso = cursos
    .map((c) => {
      const conteudo = cursoComoConteudo(c)
      return { ...c, progresso: calcularProgresso(conteudo, progressoCursos) }
    })
    .filter((c) => c.progresso > 0)

  const certificados = [
    ...trilhasComProgresso
      .filter((t) => t.progresso >= 80)
      .map((t) => ({ id: t.id, titulo: t.titulo, tipo: 'Trilha', duracao: t.duracao, professor: professorDaTrilha(t), progresso: t.progresso })),
    ...cursosComProgresso
      .filter((c) => c.progresso >= 100)
      .map((c) => ({ id: c.id, titulo: c.titulo, tipo: 'Curso', duracao: c.duracao, professor: c.professor, progresso: c.progresso })),
  ]

  const tecnologiasEstudadas = calcularTecnologiasEstudadas(progressoCursos)
  const candidaturasDoAluno = candidaturas.filter((candidatura) => candidatura.alunoId === usuarioAtual?.id)

  function iniciarDrag(e, ref) {
    if (!ref.current) return
    dragState.current = { isDragging: true, startX: e.clientX, startY: e.clientY, scrollLeft: ref.current.scrollLeft, scrollTop: ref.current.scrollTop }
    setIsDragging(true)
  }

  function movimentarDrag(e, ref) {
    const estado = dragState.current
    if (!estado.isDragging || !ref.current) return
    const dx = e.clientX - estado.startX
    const dy = e.clientY - estado.startY
    if (Math.abs(dx) > Math.abs(dy)) { ref.current.scrollLeft = estado.scrollLeft - dx; e.preventDefault() }
    else { ref.current.scrollTop = estado.scrollTop - dy; e.preventDefault() }
  }

  function finalizarDrag() { dragState.current.isDragging = false; setIsDragging(false) }

  function atualizar(campo, valor) { setForm((f) => ({ ...f, [campo]: valor })) }

  function selecionarFoto(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar('fotoUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function selecionarCapa(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar('capaUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function voltarSemSalvar() {
    setForm(formInicial)
    setEditando(false)
  }

  function descartarAlteracoes() {
    setForm(formInicial)
  }

  function salvarPerfil() {
    if (!alterado) return
    atualizarAluno({
      nome: nomeCompleto,
      titulo: form.titulo,
      bio: form.bio,
      foto: form.foto,
      fotoUrl: form.fotoUrl,
      capaUrl: form.capaUrl,
      tecnologias: form.tecnologias.split(',').map((t) => t.trim()).filter(Boolean),
    })
    setEditando(false)
  }

  function sair() { logout(); navigate('/') }

  return (
    <div className="perfil-gh-wrapper">
      
      <div className="perfil-capa-secao">
        <div
          className="perfil-capa-imagem"
          style={form.capaUrl ? { backgroundImage: `url(${form.capaUrl})` } : {}}
        >
          {editando && (
            <label className="perfil-capa-botao">
              <Camera size={15} />
              <span>Alterar capa</span>
              <input accept="image/*" type="file" onChange={selecionarCapa} />
            </label>
          )}
        </div>

        <div className="perfil-capa-avatar-ancora">
          <div className="perfil-foto-wrap">
            <Avatar
              texto={form.foto || nome.slice(0, 2).toUpperCase()}
              imagem={form.fotoUrl}
              grande
            />
            {editando && (
              <label className="perfil-foto-botao" title="Alterar foto de perfil">
                <Camera size={14} />
                <input accept="image/*" type="file" onChange={selecionarFoto} />
              </label>
            )}
          </div>
        </div>
      </div>
      {/* espaço para o avatar que "sai" da capa */}
      <div className="perfil-capa-espacador" />

      {/* ══ LAYOUT principal ══ */}
      <section className="perfil-udemy-page">

        {/* ── Sidebar ── */}
        <aside className="perfil-udemy-sidebar">
          <strong className="perfil-sidebar-nome">{nomeCompleto}</strong>
          <p className="perfil-sidebar-titulo">{form.titulo}</p>

          <h3>Descrição</h3>
          {form.bio && <p className="perfil-sidebar-bio">{form.bio}</p>}

          <nav>
            <a className="ativo" href="#perfil-publico">Perfil</a>
            <a href="#aprendizado">Aprendizado</a>
            <a href="#certificados">Certificados</a>
            <a href="#candidaturas">Candidaturas</a>
            <Link to="/aluno/questionario">Editar Wizard</Link>
            <button className="perfil-sidebar-sair" type="button" onClick={sair}>
              <LogOut size={14} /> Sair
            </button>
          </nav>
        </aside>

        <main className="perfil-udemy-conteudo">

          <header className="perfil-udemy-header" id="perfil-publico">
            <div>
              <h1>Perfil público</h1>
              <p>Gerencie suas informações e acompanhe seu progresso</p>
            </div>
            <div className="perfil-edicao-acoes">
              {editando ? (
                <>
                  {/* Voltar — sempre visível em modo edição */}
                  <button className="botao botao-ghost" type="button" onClick={voltarSemSalvar}>
                    <ArrowLeft size={15} /> Voltar
                  </button>

                  {/* Descartar — só aparece se houver alterações pendentes */}
                  {alterado && (
                    <button className="botao botao-secondary" type="button" onClick={descartarAlteracoes}>
                      <X size={15} /> Descartar
                    </button>
                  )}

                  {/* Salvar — desabilitado enquanto não houver mudança */}
                  <button
                    className="botao botao-primary"
                    type="button"
                    disabled={!alterado}
                    title={!alterado ? 'Nenhuma alteração para salvar' : 'Salvar alterações'}
                    onClick={salvarPerfil}
                  >
                    <Save size={15} /> Salvar
                  </button>
                </>
              ) : (
                <button className="botao botao-primary" type="button" onClick={() => setEditando(true)}>
                  <Pencil size={15} /> Editar perfil
                </button>
              )}
            </div>
          </header>

          {/* Formulário de edição */}
          {editando && (
            <section className="perfil-udemy-form" id="dados-basicos">
              <h2>Dados básicos</h2>

              <div className="perfil-campo-grid perfil-campo-2col">
                <label className="perfil-field">
                  <span>Primeiro nome</span>
                  <input
                    aria-label="Primeiro nome"
                    placeholder="Seu primeiro nome"
                    value={form.primeiroNome}
                    onChange={(e) => atualizar('primeiroNome', e.target.value)}
                  />
                </label>
                <label className="perfil-field">
                  <span>Sobrenome</span>
                  <input
                    aria-label="Sobrenome"
                    placeholder="Seu sobrenome"
                    value={form.sobrenome}
                    onChange={(e) => atualizar('sobrenome', e.target.value)}
                  />
                </label>
              </div>

              <label className="perfil-field">
                <span>Título / Profissão</span>
                <div className="perfil-input-contador">
                  <input
                    aria-label="Profissão ou título"
                    maxLength={60}
                    placeholder="Ex: Desenvolvedor Front-end Júnior"
                    value={form.titulo}
                    onChange={(e) => atualizar('titulo', e.target.value)}
                  />
                  <span className={form.titulo.length >= 55 ? 'perfil-contador-alerta' : ''}>
                    {form.titulo.length}/60
                  </span>
                </div>
              </label>

              <label className="perfil-field">
                <span>Biografia</span>
                <textarea
                  aria-label="Biografia"
                  rows={4}
                  placeholder="Conte um pouco sobre você, sua trajetória e objetivos..."
                  value={form.bio}
                  onChange={(e) => atualizar('bio', e.target.value)}
                />
              </label>

              <label className="perfil-field">
                <span>Tecnologias <em>(separadas por vírgula)</em></span>
                <input
                  aria-label="Tecnologias"
                  placeholder="JavaScript, React, SQL, Python..."
                  value={form.tecnologias}
                  onChange={(e) => atualizar('tecnologias', e.target.value)}
                />
              </label>

              {/* Banner de alterações pendentes */}
              {alterado && (
                <div className="perfil-aviso-pendente">
                  <span className="perfil-aviso-dot" />
                  Você tem alterações não salvas — clique em <strong>Salvar</strong> para confirmar ou <strong>Descartar</strong> para desfazer.
                </div>
              )}
            </section>
          )}

          {/* ── Aprendizado ── */}
          <section className="perfil-udemy-form perfil-metricas-bloco" id="aprendizado">
            <h2>Aprendizado</h2>
            <div className="metricas perfil-metricas-udemy">
              <article>
                <GraduationCap size={20} />
                <strong>{trilhasComProgresso.length + cursosComProgresso.length}</strong>
                <span>Conteúdos iniciados</span>
              </article>
              <article>
                <Award size={20} />
                <strong>{certificados.length}</strong>
                <span>Certificados</span>
              </article>
              <article>
                <BriefcaseBusiness size={20} />
                <strong>{candidaturasDoAluno.length}</strong>
                <span>Candidaturas</span>
              </article>
            </div>

            <div className="perfil-duas-colunas">
              <section
                className="perfil-subcard"
                ref={refCursosScroll}
                onMouseDown={(e) => iniciarDrag(e, refCursosScroll)}
                onMouseMove={(e) => movimentarDrag(e, refCursosScroll)}
                onMouseUp={finalizarDrag}
                onMouseLeave={finalizarDrag}
                style={{ cursor: isDragging ? 'grabbing' : 'default', overflowY: 'auto', maxHeight: 320 }}
              >
                <h3>Cursos em andamento</h3>
                {[...trilhasComProgresso, ...cursosComProgresso].length ? (
                  [...trilhasComProgresso, ...cursosComProgresso].map((conteudo) => (
                    <div className="linha-progresso" key={conteudo.id}>
                      <div className="linha-progresso-topo">
                        <strong>{conteudo.titulo}</strong>
                        <span>{conteudo.progresso}%</span>
                      </div>
                      <div className="progresso">
                        <span style={{ width: `${conteudo.progresso}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum curso iniciado ainda.</p>
                )}
              </section>

              <section className="perfil-subcard perfil-metricas-tecnologias">
                <div className="perfil-metricas-tecnologias-header">
                  <div>
                    <h3>Tecnologias estudadas</h3>
                    <p>Mais usadas no seu aprendizado</p>
                  </div>
                  <span>{tecnologiasEstudadas.length} tecnologias</span>
                </div>

                {tecnologiasEstudadas.length ? (
                  <div className="perfil-metricas-tecnologias-layout">
                    <div className="perfil-metricas-bar-chart">
                      {tecnologiasEstudadas.slice(0, 5).map((item) => (
                        <div className="perfil-bar-row" key={item.tecnologia}>
                          <div className="perfil-bar-meta">
                            <strong>{item.rotulo}</strong>
                            <small>{item.percentual}%</small>
                          </div>
                          <div className="perfil-bar-track">
                            <div className="perfil-bar-fill" style={{ width: `${item.percentual}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="perfil-metricas-circle-card">
                      <div className="perfil-metricas-circle-ring">
                        <div className="perfil-metricas-circle-core">
                          <span className="perfil-metricas-circle-icon">
                            {tecnologiasEstudadas[0].rotulo.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="perfil-metricas-circle-label">
                        <strong>{tecnologiasEstudadas[0].rotulo}</strong>
                        <small>Mais estudada</small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Quando você marcar aulas como concluídas, o gráfico aparece aqui.</p>
                )}
              </section>
            </div>
          </section>

          {/* ── Certificados ── */}
          <section className="perfil-udemy-form" id="certificados">
            <h2>Certificados</h2>
            {certificados.length ? (
              <div
                className="certificados-lista"
                ref={refCertificadosScroll}
                onMouseDown={(e) => iniciarDrag(e, refCertificadosScroll)}
                onMouseMove={(e) => movimentarDrag(e, refCertificadosScroll)}
                onMouseUp={finalizarDrag}
                onMouseLeave={finalizarDrag}
                style={{ cursor: isDragging ? 'grabbing' : 'default' }}
              >
                {certificados.map((cert) => (
                  <article className="certificado-card" key={`${cert.tipo}-${cert.id}`}>
                    <div className="certificado-card-cabecalho">
                      <span className="certificado-tipo">{cert.tipo}</span>
                      <strong>{cert.titulo}</strong>
                    </div>
                    <div className="certificado-acoes">
                      <button
                        className="botao botao-primary"
                        type="button"
                        onClick={() => baixarCertificadoPdf({ aluno: usuarioAtual?.nome, curso: cert.titulo, professor: cert.professor, horas: cert.duracao })}
                      >
                        <Download size={15} /> Baixar PDF
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>Certificados aparecem quando uma trilha chega a 80% ou quando um curso da plataforma é concluído.</p>
            )}
          </section>

          {/* ── Candidaturas ── */}
          <section className="perfil-udemy-form" id="candidaturas">
            <h2>Candidaturas</h2>
            {candidaturasDoAluno.length ? (
              candidaturasDoAluno.map((candidatura) => {
                const vaga = vagasEmpresa.find((v) => v.id === candidatura.vagaId)
                return (
                  <div className="candidatura-item" key={candidatura.id}>
                    <strong>{vaga?.titulo || 'Vaga removida'}</strong>
                    <span className="candidatura-status">{candidatura.status}</span>
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
    </div>
  )
}
