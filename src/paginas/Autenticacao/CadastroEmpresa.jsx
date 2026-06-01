import { useState } from 'react'
import { Building2, LockKeyhole, Mail, MapPin, SquareUserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { MentorCompactadoButton } from '../../componentes/interface/MentorCompactadoButton'
import { MentorFeedback } from '../../componentes/interface/MentorFeedback'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro from '../../ativos/imagens/imagem-teste-4.png'
import ilustracaoCadastro2 from '../../ativos/imagens/imagem-teste-2.png'
import {
  cnpjValido,
  emailCorporativoValido,
  mensagensSenha,
  progressoSenha,
  requisitosSenha,
} from '../../servicos/validacaoAuth'

const formInicial = {
  nome: '',
  cnpj: '',
  email: '',
  repetirEmail: '',
  senha: '',
  repetirSenha: '',
  localizacao: '',
  site: '',
  descricao: '',
}

export function CadastroEmpresa() {
  const navigate = useNavigate()
  const { cadastrarEmpresa } = useApp()
  const [form, setForm] = useState(formInicial)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [erroConta, setErroConta] = useState('')
  const [feedbackFechado, setFeedbackFechado] = useState(false)
  const requisitos = requisitosSenha(form.senha)
  const progresso = progressoSenha(form.senha)
  const itensValidacao = tentouEnviar ? validarFormulario() : []
  const itensFeedback = [...itensValidacao, ...(erroConta ? [erroConta] : [])]

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setErroConta('')
  }

  function validarFormulario() {
    const pendencias = []

    if (!form.nome.trim()) pendencias.push('qual o nome da sua empresa?')
    if (!form.cnpj.trim()) pendencias.push('preciso do CNPJ da empresa')
    else if (!cnpjValido(form.cnpj)) pendencias.push('CNPJ parece incorreto, dá uma olhada')
    if (!form.email.trim()) pendencias.push('informe o e-mail corporativo')
    else if (!emailCorporativoValido(form.email)) pendencias.push('e-mail corporativo não parece válido')
    if (!form.repetirEmail.trim()) pendencias.push('confirme o e-mail corporativo')
    else if (form.email && form.email !== form.repetirEmail) pendencias.push('os e-mails corporativos não conferem')
    if (!form.senha) pendencias.push('crie uma senha para acesso')
    else pendencias.push(...mensagensSenha(form.senha))
    if (!form.repetirSenha) pendencias.push('repita a senha criada')
    else if (form.senha && form.senha !== form.repetirSenha) pendencias.push('as senhas estão diferentes, ajuste')
    if (!form.localizacao.trim()) pendencias.push('selecione sua localização')

    return pendencias
  }

  function saudacaoFeedback() {
    const nomeEmpresa = form.nome.trim()
    if (nomeEmpresa) return `Ei pessoal da ${nomeEmpresa}, você precisa fazer o seguinte:`
    return 'Ei humano da empresa, você precisa fazer o seguinte:'
  }

  function enviar(evento) {
    evento.preventDefault()
    setTentouEnviar(true)
    setErroConta('')
    setFeedbackFechado(false)

    const pendencias = validarFormulario()
    if (pendencias.length) {
      return
    }

    const resposta = cadastrarEmpresa({
      nome: form.nome.trim(),
      cnpj: form.cnpj.trim(),
      email: form.email,
      senha: form.senha,
      localizacao: form.localizacao.trim(),
      site: form.site.trim(),
      descricao: form.descricao.trim(),
    })

    if (!resposta.ok) {
      setErroConta(resposta.mensagem)
      return
    }

    navigate('/empresa/painel')
  }

  return (
    <section className="auth-html cadastro-page-html">
      <h1 className="cadastro-title-html">
        Cadastre sua empresa <span>e encontre novos talentos.</span>
      </h1>

      <div className="cadastro-container-layout">
        <div className="coluna-imagem lateral-esquerda">
          <img src={ilustracaoCadastro} alt="Ilustração de boas-vindas para empresas" />
        </div>

        <form className="cadastro-card-html" onSubmit={enviar} noValidate>
          <div className="tab-switch-html">
            <Link to="/cadastro/aluno">Aluno</Link>
            <button className="active" type="button">
              Empresa
            </button>
          </div>

          <label className="field-label-html" htmlFor="empresa-nome">
            Nome da empresa
          </label>
          <div className="input-wrap-html">
            <span>
              <Building2 size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-nome"
              value={form.nome}
              onChange={(e) => atualizar('nome', e.target.value)}
              placeholder="Nome que os candidatos verão"
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-cnpj">
            CNPJ
          </label>
          <div className="input-wrap-html">
            <span>
              <SquareUserRound size={16} color="#1a6bff" />
            </span>
            <input id="empresa-cnpj" value={form.cnpj} onChange={(e) => atualizar('cnpj', e.target.value)} />
          </div>
          <small className="field-hint-html">ex: 00.000.000/0001-91</small>

          <label className="field-label-html" htmlFor="empresa-email">
            E-mail corporativo
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-email"
              type="email"
              value={form.email}
              onChange={(e) => atualizar('email', e.target.value)}
              autoComplete="email"
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-repetir-email">
            Repetir e-mail
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-repetir-email"
              type="email"
              value={form.repetirEmail}
              onChange={(e) => atualizar('repetirEmail', e.target.value)}
              autoComplete="email"
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-senha">
            Senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-senha"
              type="password"
              value={form.senha}
              onChange={(e) => atualizar('senha', e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="pw-strength-html" aria-label="Requisitos da senha">
            {requisitos.map((requisito, index) => (
              <span className={index < progresso ? 'ativo' : ''} key={requisito.id} />
            ))}
          </div>

          <label className="field-label-html" htmlFor="empresa-repetir-senha">
            Repetir senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-repetir-senha"
              type="password"
              value={form.repetirSenha}
              onChange={(e) => atualizar('repetirSenha', e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-localizacao">
            Localização
          </label>
          <div className="input-wrap-html">
            <span>
              <MapPin size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-localizacao"
              value={form.localizacao}
              onChange={(e) => atualizar('localizacao', e.target.value)}
              placeholder="Ex: Recife, PE"
            />
          </div>

          <button className="btn-submit-html" type="submit">
            Cadastrar
          </button>
        </form>

        <div className="coluna-imagem lateral-direita">
          <img src={ilustracaoCadastro2} alt="Ilustração de boas-vindas para novas empresas" />
        </div>
      </div>

      {feedbackFechado && itensFeedback.length > 0 ? (
        <MentorCompactadoButton posicao="direita" onClick={() => setFeedbackFechado(false)} />
      ) : !feedbackFechado && (
        <MentorFeedback
          saudacao={saudacaoFeedback()}
          itens={itensFeedback}
          posicao="direita"
          onClose={() => setFeedbackFechado(true)}
        />
      )}
    </section>
  )
}
