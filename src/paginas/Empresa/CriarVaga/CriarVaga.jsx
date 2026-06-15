import { AlertTriangle, CheckCircle2, Copy, Gauge, RefreshCw, Send, Sparkles, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorEmpresaToast } from '../../../componentes/interface/MentorEmpresaToast'
import { useApp } from '../../../contextos/AppContext'
import { analisarQualidadeVaga } from '../../../servicos/empresaInteligencia'
import { melhorarVagaComIA } from '../../../servicos/empresaIA'

const formVazio = {
  titulo: '',
  descricao: '',
  requisitos: '',
  atividades: '',
  salario: '',
  tipo: 'CLT',
  nivel: 'Júnior',
  modalidade: 'Remoto',
  localizacao: '',
  tags: '',
}

const tagsSugeridas = ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'SQL', 'Docker', 'Git', 'Figma', 'GraphQL']
const camposProgresso = ['titulo', 'descricao', 'requisitos', 'atividades', 'salario', 'localizacao', 'tags']

function limparSalario(valor) {
  return String(valor || '').replace(/^R\$\s*/i, '')
}

function normalizarSalario(valor) {
  const salario = limparSalario(valor).trim()
  return salario ? `R$ ${salario}` : ''
}

function normalizarNivel(valor) {
  const niveis = {
    Estagio: 'Estágio',
    Estágio: 'Estágio',
    Junior: 'Júnior',
    Júnior: 'Júnior',
    Pleno: 'Pleno',
    Senior: 'Sênior',
    Sênior: 'Sênior',
    Especialista: 'Especialista',
    Trainee: 'Trainee',
    Lideranca: 'Liderança',
    Liderança: 'Liderança',
  }

  return niveis[valor] || valor || 'Júnior'
}

function normalizarModalidade(valor) {
  const modalidades = {
    Remoto: 'Remoto',
    Hibrido: 'Híbrido',
    Híbrido: 'Híbrido',
    Presencial: 'Presencial',
    Flexivel: 'Flexível',
    Flexível: 'Flexível',
  }

  return modalidades[valor] || valor || 'Remoto'
}

function normalizarTipo(valor) {
  const tipos = {
    CLT: 'CLT',
    PJ: 'PJ',
    Estagio: 'Estágio',
    Estágio: 'Estágio',
    Freelance: 'Freelance',
    Temporario: 'Temporário',
    Temporário: 'Temporário',
    Aprendiz: 'Aprendiz',
  }

  return tipos[valor] || valor || 'CLT'
}

function vagaParaForm(vaga) {
  if (!vaga) return formVazio

  return {
    titulo: vaga.titulo || '',
    descricao: vaga.descricao || '',
    requisitos: Array.isArray(vaga.requisitos) ? vaga.requisitos.join('\n') : vaga.requisitos || '',
    atividades: Array.isArray(vaga.atividades) ? vaga.atividades.join('\n') : vaga.atividades || '',
    salario: limparSalario(vaga.salario),
    tipo: normalizarTipo(vaga.tipo),
    nivel: normalizarNivel(vaga.nivel),
    modalidade: normalizarModalidade(vaga.modalidade),
    localizacao: vaga.localizacao || '',
    tags: Array.isArray(vaga.tags) ? vaga.tags.join(', ') : vaga.tags || '',
  }
}

function separarTags(valor) {
  return String(valor || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function linhasFormulario(valor) {
  return String(valor || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function textoCurto(texto, limite = 140) {
  if (!texto) return ''
  return texto.length > limite ? `${texto.slice(0, limite).trim()}...` : texto
}

function classeModalidade(modalidade) {
  const valor = modalidade.toLowerCase()
  if (valor.includes('presencial')) return 'presencial'
  if (valor.includes('híbrido') || valor.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function Campo({ label, hint, span = false, children }) {
  return (
    <label className={span ? 'vaga-field span-2' : 'vaga-field'}>
      <span className="field-label">{label}</span>
      {children}
      {hint && <small className="field-hint">{hint}</small>}
    </label>
  )
}

export function CriarVaga() {
  const navigate = useNavigate()
  const tituloRef = useRef(null)
  const { vagaId } = useParams()
  const { usuarioAtual, publicarVaga, atualizarVaga, vagasEmpresa } = useApp()
  const vagaEditada = useMemo(() => vagasEmpresa.find((vaga) => vaga.id === vagaId), [vagaId, vagasEmpresa])
  const modoEdicao = Boolean(vagaId)
  const [erro, setErro] = useState('')
  const [tituloInvalido, setTituloInvalido] = useState(false)
  const [form, setForm] = useState(() => vagaParaForm(vagaEditada))
  const [sugestaoMentor, setSugestaoMentor] = useState(null)
  const [carregandoSugestao, setCarregandoSugestao] = useState(false)
  const [mensagemSugestao, setMensagemSugestao] = useState('')
  const [versaoSugestao, setVersaoSugestao] = useState(0)

  const camposPreenchidos = camposProgresso.filter((campo) => String(form[campo] || '').trim()).length
  const progresso = Math.round((camposPreenchidos / camposProgresso.length) * 100)
  const tagsPreview = separarTags(form.tags)
  const etapa1Completa = camposPreenchidos >= 4
  const etapa2Completa = camposPreenchidos >= 7
  const etapa1Classe = etapa1Completa ? 'step-item done' : 'step-item active'
  const etapa2Classe = etapa1Completa ? (etapa2Completa ? 'step-item done' : 'step-item active') : 'step-item'
  const etapa3Classe = etapa2Completa ? 'step-item active' : 'step-item'
  const salarioPreview = form.salario ? normalizarSalario(form.salario) : ''
  const vagaParaAnalise = useMemo(
    () => ({
      ...form,
      salario: normalizarSalario(form.salario),
      tags: separarTags(form.tags),
      requisitos: linhasFormulario(form.requisitos),
      atividades: linhasFormulario(form.atividades),
    }),
    [form],
  )
  const raioX = useMemo(() => analisarQualidadeVaga(vagaParaAnalise), [vagaParaAnalise])

  function atualizar(campo, valor) {
    setErro('')
    setTituloInvalido(false)
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function adicionarTag(tag) {
    setForm((atual) => {
      const tagsAtuais = separarTags(atual.tags)
      const existe = tagsAtuais.some((item) => item.toLowerCase() === tag.toLowerCase())
      return existe ? atual : { ...atual, tags: [...tagsAtuais, tag].join(', ') }
    })
  }

  async function gerarSugestaoMentor() {
    setCarregandoSugestao(true)
    setMensagemSugestao('Preparando uma nova sugestão...')
    try {
      const proximaVersao = versaoSugestao + 1
      const sugestao = await melhorarVagaComIA({
        vaga: vagaParaAnalise,
        empresa: usuarioAtual,
        analiseAtual: raioX,
        variacao: proximaVersao,
      })
      setSugestaoMentor(sugestao)
      setVersaoSugestao(proximaVersao)
      setMensagemSugestao(sugestao.origem === 'ia'
        ? 'Nova versão personalizada gerada pelo mentor local.'
        : 'O mentor local não respondeu. A sugestão padrão segura foi mantida.')
    } catch {
      setMensagemSugestao('Não foi possível atualizar a sugestão agora. A versão atual foi mantida.')
    } finally {
      setCarregandoSugestao(false)
    }
  }

  function aplicarSugestaoMentor() {
    if (!sugestaoMentor) return
    setForm((atual) => ({
      ...atual,
      titulo: sugestaoMentor.titulo || atual.titulo,
      descricao: sugestaoMentor.descricao || atual.descricao,
      requisitos: sugestaoMentor.requisitos || atual.requisitos,
      atividades: sugestaoMentor.atividades || atual.atividades,
      tags: sugestaoMentor.tags?.length ? sugestaoMentor.tags.join(', ') : atual.tags,
    }))
    setMensagemSugestao('Sugestão aplicada ao formulário. Revise os campos antes de salvar ou publicar.')
    setSugestaoMentor(null)
  }

  async function copiarSugestaoMentor() {
    if (!sugestaoMentor) return
    const conteudo = [
      sugestaoMentor.titulo, '', sugestaoMentor.descricao, '', 'Requisitos:', sugestaoMentor.requisitos,
      '', 'Atividades:', sugestaoMentor.atividades, '', `Tags: ${sugestaoMentor.tags.join(', ')}`,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(conteudo)
      setMensagemSugestao('Sugestão copiada.')
    } catch {
      setMensagemSugestao('Não foi possível copiar automaticamente. Você ainda pode revisar e aplicar a sugestão.')
    }
  }

  function enviar(evento) {
    evento.preventDefault()
    if (!form.titulo.trim()) {
      setErro('Informe o título da vaga antes de publicar.')
      setTituloInvalido(true)
      tituloRef.current?.focus()
      setTimeout(() => setTituloInvalido(false), 2000)
      return
    }

    if (!form.descricao || !form.requisitos || !form.salario) {
      setErro('Preencha os campos obrigatórios.')
      return
    }

    const dados = {
      ...form,
      salario: normalizarSalario(form.salario),
    }

    if (modoEdicao) {
      atualizarVaga(vagaId, dados)
    } else {
      publicarVaga(dados)
    }
    navigate('/empresa/gerenciar-vagas')
  }

  if (modoEdicao && !vagaEditada) {
    return (
      <section className="pagina pagina-estreita">
        <div className="form-card empresa-form-card">
          <span className="eyebrow">Editar vaga</span>
          <h1>Vaga não encontrada</h1>
          <p>Não foi possível encontrar a vaga selecionada para edição.</p>
          <Botao to="/empresa/gerenciar-vagas" variant="secondary">
            Voltar para gerenciar
          </Botao>
        </div>
      </section>
    )
  }

  return (
    <section className="criar-vaga-page">
      <form className="criar-vaga-layout" onSubmit={enviar}>
        <aside className="criar-vaga-sidebar">
          <p className="sidebar-label">Etapas</p>
          <div className="step-list">
            <a className={etapa1Classe} href="#card-informacoes">
              <span className="step-dot">01</span>
              <span>
                <strong className="step-name">Informações</strong>
                <small className="step-desc">Título, descrição e atividades</small>
              </span>
            </a>
            <a className={etapa2Classe} href="#card-condicoes">
              <span className="step-dot">02</span>
              <span>
                <strong className="step-name">Condições</strong>
                <small className="step-desc">Salário, nível e modalidade</small>
              </span>
            </a>
            <span className={etapa3Classe}>
              <span className="step-dot">03</span>
              <span>
                <strong className="step-name">Publicar</strong>
                <small className="step-desc">Revisar e confirmar</small>
              </span>
            </span>
          </div>

          <div className="prog-section">
            <div className="prog-label">
              <span>Preenchimento</span>
              <strong>{progresso}%</strong>
            </div>
            <div className="prog-track">
              <span className="prog-fill" style={{ width: `${progresso}%` }} />
            </div>
          </div>
        </aside>

        <main className="criar-vaga-main">
          <div className="criar-vaga-page-header">
            <p className="page-eyebrow">{modoEdicao ? 'Editar vaga' : 'Nova vaga'}</p>
            <h1 className="page-title">{modoEdicao ? 'Editar vaga' : 'Criar vaga'}</h1>
            <p className="page-sub">Preencha os dados para publicar uma oportunidade clara e atrativa.</p>
            <button className="vaga-mentor-trigger" type="button" onClick={gerarSugestaoMentor} disabled={carregandoSugestao}>
              {carregandoSugestao ? <RefreshCw className="girando" size={17} /> : <Sparkles size={17} />}
              {carregandoSugestao ? 'Analisando vaga...' : 'Melhorar vaga com mentor'}
            </button>
            {mensagemSugestao && <p className="vaga-mentor-status">{mensagemSugestao}</p>}
          </div>

          <section className="vaga-editor-card" id="card-informacoes">
            <header className="vaga-editor-card-header">
              <span className="card-num">01</span>
              <div>
                <h2>Informações principais</h2>
                <p>Cargo, contexto e expectativas do dia a dia</p>
              </div>
            </header>
            <div className="vaga-editor-card-body">
              <div className="vaga-fields">
                <Campo label="Título da vaga" span>
                  <input
                    className={tituloInvalido ? 'campo-invalido' : ''}
                    ref={tituloRef}
                    type="text"
                    value={form.titulo}
                    onChange={(e) => atualizar('titulo', e.target.value)}
                    placeholder="Ex: Desenvolvedor(a) Full Stack Sênior"
                  />
                </Campo>
                <Campo label="Descrição" span>
                  <textarea
                    value={form.descricao}
                    onChange={(e) => atualizar('descricao', e.target.value)}
                    placeholder="Apresente a empresa, o time e o propósito da vaga. Seja claro e atrativo."
                  />
                </Campo>
                <Campo label="Requisitos" hint="Um requisito por linha" span>
                  <textarea
                    value={form.requisitos}
                    onChange={(e) => atualizar('requisitos', e.target.value)}
                    placeholder={'3+ anos com React\nInglês intermediário\nExperiência com APIs REST'}
                  />
                </Campo>
                <Campo label="Atividades" hint="Uma atividade por linha" span>
                  <textarea
                    value={form.atividades}
                    onChange={(e) => atualizar('atividades', e.target.value)}
                    placeholder={'Desenvolver features no produto principal\nParticipar de code reviews\nColaborar com design e produto'}
                  />
                </Campo>
              </div>
            </div>
          </section>

          <section className="vaga-editor-card" id="card-condicoes">
            <header className="vaga-editor-card-header">
              <span className="card-num">02</span>
              <div>
                <h2>Condições e formato</h2>
                <p>Contrato, senioridade, modalidade e tecnologias</p>
              </div>
            </header>
            <div className="vaga-editor-card-body">
              <div className="vaga-fields grid-2">
                <Campo label="Faixa salarial">
                  <div className="input-wrap">
                    <span className="input-prefix">R$</span>
                    <input
                      type="text"
                      value={form.salario}
                      onChange={(e) => atualizar('salario', e.target.value)}
                      placeholder="8.000 - 12.000"
                    />
                  </div>
                </Campo>

                <Campo label="Tipo de contrato">
                  <div className="select-wrap">
                    <select value={form.tipo} onChange={(e) => atualizar('tipo', e.target.value)}>
                      <option>CLT</option>
                      <option>PJ</option>
                      <option>Estágio</option>
                      <option>Freelance</option>
                    </select>
                  </div>
                </Campo>

                <Campo label="Nível">
                  <div className="select-wrap">
                    <select value={form.nivel} onChange={(e) => atualizar('nivel', e.target.value)}>
                      <option>Júnior</option>
                      <option>Pleno</option>
                      <option>Sênior</option>
                      <option>Especialista</option>
                      <option>Liderança</option>
                    </select>
                  </div>
                </Campo>

                <Campo label="Modalidade">
                  <div className="select-wrap">
                    <select value={form.modalidade} onChange={(e) => atualizar('modalidade', e.target.value)}>
                      <option>Remoto</option>
                      <option>Presencial</option>
                      <option>Híbrido</option>
                    </select>
                  </div>
                </Campo>

                <Campo label="Localização">
                  <input
                    type="text"
                    value={form.localizacao}
                    onChange={(e) => atualizar('localizacao', e.target.value)}
                    placeholder="Ex: São Paulo, SP"
                  />
                </Campo>

                <Campo label="Tags separadas por vírgula">
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => atualizar('tags', e.target.value)}
                    placeholder="React, Node.js, AWS"
                  />
                </Campo>

                <div className="tags-sugeridas span-2">
                  {tagsSugeridas.map((tag) => (
                    <button
                      className={tagsPreview.some((item) => item.toLowerCase() === tag.toLowerCase()) ? 'selected' : ''}
                      key={tag}
                      type="button"
                      onClick={() => adicionarTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {erro && <p className="erro">{erro}</p>}
          <div className="linha-acoes criar-vaga-acoes">
            <Botao to="/empresa/gerenciar-vagas" variant="secondary">
              Voltar
            </Botao>
            <Botao type="submit">
              <Send size={16} />
              {modoEdicao ? 'Salvar alterações' : 'Publicar vaga'}
            </Botao>
          </div>
        </main>

        <aside className="criar-vaga-preview">
          <section className="empresa-inteligencia-card raio-x-vaga">
              <header>
              <div>
                <span className="empresa-inteligencia-label"><Gauge size={15} /> Raio-X da vaga</span>
                <strong>{raioX.pontuacao}%</strong>
              </div>
              <span className={`empresa-inteligencia-nivel nivel-${raioX.pontuacao >= 65 ? 'forte' : 'atencao'}`}>
                {raioX.nivel}
              </span>
            </header>
            <div className="empresa-inteligencia-metricas">
              <div><span>Qualidade</span><strong>{raioX.pontuacao}%</strong></div>
              <div><span>Atratividade</span><strong>{raioX.atratividade.nivel}</strong></div>
              <div><span>Coerência</span><strong>{raioX.coerencia.nivel}</strong></div>
            </div>
            <div className="empresa-inteligencia-barra"><i style={{ width: `${raioX.pontuacao}%` }} /></div>
            {raioX.erros.length || raioX.alertas.length ? (
              <ul className="empresa-inteligencia-alertas">
                {[...raioX.erros, ...raioX.alertas].slice(0, 3).map((aviso) => <li key={aviso}><AlertTriangle size={14} /> {aviso}</li>)}
              </ul>
            ) : raioX.sugestoes.length ? (
              <ul className="empresa-inteligencia-alertas empresa-inteligencia-sugestoes">
                {raioX.sugestoes.slice(0, 2).map((sugestao) => <li key={sugestao}><CheckCircle2 size={14} /> Sugestão: {sugestao}</li>)}
              </ul>
            ) : (
              <p className="empresa-inteligencia-ok"><CheckCircle2 size={15} /> {raioX.mensagemPositiva}</p>
            )}
          </section>
          <p className="preview-panel-title">Preview da vaga</p>
          <article className="preview-card">
            <div className="preview-card-top">
              <div className="prev-badges">
                <span className={`prev-badge ${classeModalidade(form.modalidade)}`}>{form.modalidade}</span>
                <span className="prev-badge tipo">{form.tipo}</span>
                <span className="prev-badge nivel">{form.nivel}</span>
              </div>
              <h2 className={form.titulo ? 'prev-title' : 'prev-title prev-title-empty'}>
                {form.titulo || 'Título da vaga...'}
              </h2>
            </div>

            <div className="preview-card-body">
              <p className="prev-section-label">Salário</p>
              <p className={salarioPreview ? 'prev-salario' : 'prev-salario prev-salario-empty'}>
                {salarioPreview || 'Não informado'}
              </p>

              <p className="prev-section-label">Detalhes</p>
              <div className="prev-meta">
                <p className="prev-meta-row">
                  <strong>Contrato:</strong> {form.tipo}
                </p>
                <p className="prev-meta-row">
                  <strong>Nível:</strong> {form.nivel}
                </p>
                {form.localizacao && (
                  <p className="prev-meta-row">
                    <strong>Local:</strong> {form.localizacao}
                  </p>
                )}
              </div>

              <p className="prev-section-label">Descrição</p>
              <p className={form.descricao ? 'prev-desc' : 'prev-desc prev-empty'}>
                {textoCurto(form.descricao) || 'A descrição aparecerá aqui...'}
              </p>

              {tagsPreview.length > 0 && (
                <>
                  <p className="prev-section-label">Tecnologias</p>
                  <div className="prev-tags">
                    {tagsPreview.map((tag) => (
                      <span className="prev-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </article>

          <div className="tip-box transparencia-salarial-card">
            <strong>Transparência salarial</strong>
            <h3>Por que informar a faixa salarial?</h3>
            <p>
              A transparência ajuda candidatos a comparar oportunidades e permite que o RH receba pessoas
              mais alinhadas, reduzindo tempo e retrabalho no processo seletivo.
            </p>

            <details>
              <summary>Ver análise completa</summary>
              <div className="transparencia-salarial-detalhes">
                <section>
                  <h4>Para o trabalhador</h4>
                  <ul>
                    <li>Garante clareza desde o início do processo.</li>
                    <li>Evita frustrações e perda de tempo.</li>
                    <li>Ajuda a comparar oportunidades com critérios reais e justos.</li>
                  </ul>
                </section>
                <section>
                  <h4>Para o RH</h4>
                  <ul>
                    <li>Recebe candidatos mais alinhados à faixa salarial.</li>
                    <li>Reduz retrabalho e sobrecarga operacional.</li>
                    <li>Melhora a experiência dos candidatos e a reputação empregadora.</li>
                  </ul>
                </section>
                <section>
                  <h4>Para a empresa</h4>
                  <ul>
                    <li>Agiliza contratações e otimiza o funil de recrutamento.</li>
                    <li>Reduz custos e tempo de processo.</li>
                    <li>Fortalece uma imagem mais ética e atrativa no mercado.</li>
                    <li>Contribui para práticas de ESG e equidade salarial.</li>
                  </ul>
                </section>
              </div>
            </details>

            <a href="https://www.alelo.com.br/blog/rh-e-gestao/qual-a-importancia-da-transparencia-salarial" target="_blank" rel="noreferrer">
              Fonte: Alelo — Qual a importância da transparência salarial?
            </a>
          </div>
        </aside>
      </form>

      <MentorEmpresaToast
        empresaAtual={usuarioAtual}
        tela="criar-vaga"
        formularioVaga={{
          ...vagaParaAnalise,
        }}
        onMelhorarVaga={gerarSugestaoMentor}
      />

      {sugestaoMentor && (
        <div className="vaga-mentor-modal" role="presentation" onMouseDown={(evento) => {
          if (evento.target === evento.currentTarget) setSugestaoMentor(null)
        }}>
          <section className="vaga-mentor-modal-card" role="dialog" aria-modal="true" aria-labelledby="vaga-mentor-titulo">
            <header>
              <div>
                <span className="empresa-inteligencia-label"><Sparkles size={15} /> Mentor da empresa</span>
                <h2 id="vaga-mentor-titulo">Sugestão do mentor para esta vaga</h2>
                <p>Revise a sugestão antes de aplicar. O mentor não publica nem salva a vaga automaticamente.</p>
              </div>
              <button type="button" aria-label="Fechar sugestão" onClick={() => setSugestaoMentor(null)}><X size={20} /></button>
              </header>

              {mensagemSugestao && <p className="vaga-mentor-status vaga-mentor-modal-status">{mensagemSugestao}</p>}

              <div className="vaga-mentor-sugestoes">
              <article className="span-2"><span>Título sugerido</span><strong>{sugestaoMentor.titulo}</strong></article>
              <article className="span-2"><span>Descrição sugerida</span><p>{sugestaoMentor.descricao}</p></article>
              <article><span>Requisitos sugeridos</span><ul>{linhasFormulario(sugestaoMentor.requisitos).map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><span>Atividades sugeridas</span><ul>{linhasFormulario(sugestaoMentor.atividades).map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><span>Tags sugeridas</span><div className="vaga-mentor-tags">{sugestaoMentor.tags.map((tag) => <i key={tag}>{tag}</i>)}</div></article>
              <article><span>Observações do mentor</span><ul>{sugestaoMentor.observacoes.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>

            <footer>
              <button className="botao botao-secondary" type="button" onClick={() => setSugestaoMentor(null)}>Cancelar</button>
              <button className="botao botao-secondary" type="button" onClick={copiarSugestaoMentor}><Copy size={16} /> Copiar texto</button>
              <button className="botao botao-secondary" type="button" onClick={gerarSugestaoMentor} disabled={carregandoSugestao}>
                <RefreshCw className={carregandoSugestao ? 'girando' : ''} size={16} />
                {carregandoSugestao ? 'Gerando nova versão...' : 'Gerar outra versão'}
              </button>
              <button className="botao botao-primary" type="button" onClick={aplicarSugestaoMentor}><CheckCircle2 size={16} /> Aplicar sugestão</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}
