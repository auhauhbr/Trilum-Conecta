import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSplitLayout } from '../../componentes/autenticacao/AuthSplitLayout'
import { MentorCompactadoButton } from '../../componentes/interface/MentorCompactadoButton'
import { MentorFeedback } from '../../componentes/interface/MentorFeedback'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro4 from '../../ativos/imagens/imagem-teste-8.png'
import { emailValido, mensagensSenha, progressoSenha, requisitosSenha } from '../../servicos/validacaoAuth'

const estadoRecuperacaoInicial = {
  email: '',
  senha: '',
  repetirSenha: '',
}

export function Login() {
  const navigate = useNavigate()
  const { login, redefinirSenha } = useApp()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [recuperacao, setRecuperacao] = useState(estadoRecuperacaoInicial)
  const [modoRecuperacao, setModoRecuperacao] = useState(false)
  const [erroConta, setErroConta] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tentouLogin, setTentouLogin] = useState(false)
  const [tentouRecuperacao, setTentouRecuperacao] = useState(false)
  const [feedbackFechado, setFeedbackFechado] = useState(false)
  const requisitosRecuperacao = requisitosSenha(recuperacao.senha)
  const progressoRecuperacao = progressoSenha(recuperacao.senha)
  const itensValidacao = modoRecuperacao
    ? tentouRecuperacao
      ? validarRecuperacao()
      : []
    : tentouLogin
      ? validarLogin()
      : []
  const itensFeedback = [...itensValidacao, ...(erroConta ? [erroConta] : [])]

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setErroConta('')
  }

  function atualizarRecuperacao(campo, valor) {
    setRecuperacao((atual) => ({ ...atual, [campo]: valor }))
    setErroConta('')
  }

  function validarLogin() {
    const pendencias = []
    if (!form.email.trim()) pendencias.push('preciso do seu e-mail para encontrar sua conta')
    else if (!emailValido(form.email)) pendencias.push('esse e-mail não parece válido, verifique')
    if (!form.senha) pendencias.push('cadê a senha? preciso dela para liberar seu acesso')
    return pendencias
  }

  function validarRecuperacao() {
    const pendencias = []
    if (!recuperacao.email.trim()) pendencias.push('preciso do seu e-mail para encontrar sua conta')
    else if (!emailValido(recuperacao.email)) pendencias.push('esse e-mail não parece válido, verifique')
    if (!recuperacao.senha) pendencias.push('cadê a nova senha? precisa criar uma')
    else pendencias.push(...mensagensSenha(recuperacao.senha))
    if (!recuperacao.repetirSenha) pendencias.push('confirme sua senha repetindo ela')
    else if (recuperacao.senha && recuperacao.senha !== recuperacao.repetirSenha) {
      pendencias.push('as senhas não batem, digite igual nas duas')
    }
    return pendencias
  }

  function saudacaoFeedback() {
    return 'Ei humano que não sei o nome, você precisa fazer o seguinte:'
  }

  function enviar(evento) {
    evento.preventDefault()
    setTentouLogin(true)
    setErroConta('')
    setMensagem('')
    setFeedbackFechado(false)

    const pendencias = validarLogin()
    if (pendencias.length) {
      return
    }

    const resposta = login(form.email, form.senha)
    if (!resposta.ok) {
      setErroConta(resposta.mensagem)
      return
    }

    navigate(resposta.redirecionarPara)
  }

  function enviarRecuperacao(evento) {
    evento.preventDefault()
    setTentouRecuperacao(true)
    setErroConta('')
    setMensagem('')
    setFeedbackFechado(false)

    const pendencias = validarRecuperacao()
    if (pendencias.length) {
      return
    }

    const resposta = redefinirSenha({ email: recuperacao.email, senha: recuperacao.senha })
    if (!resposta.ok) {
      setErroConta(resposta.mensagem)
      return
    }

    setMensagem(resposta.mensagem)
    setForm({ email: recuperacao.email, senha: '' })
    setRecuperacao(estadoRecuperacaoInicial)
    setModoRecuperacao(false)
  }

  return (
    <>
      <AuthSplitLayout
        imagem={ilustracaoCadastro4}
        imagemAlt="Pessoa estudando com notebook"
        etiqueta="Continue sua jornada"
        titulo="Seu próximo passo profissional começa aqui."
        descricao="Entre para continuar seus estudos, acompanhar oportunidades e fortalecer seu perfil."
        beneficios={[
          'Retome sua trilha de onde parou',
          'Acompanhe cursos, progresso e certificados',
          'Explore oportunidades compatíveis com você',
        ]}
        compacto
      >
        <form className="login-card-html" onSubmit={modoRecuperacao ? enviarRecuperacao : enviar} noValidate>
          <header className="auth-form-header">
            <span>{modoRecuperacao ? 'Recupere seu acesso' : 'Bem-vindo de volta'}</span>
          <h2>{modoRecuperacao ? 'Recuperar senha' : 'Login'}</h2>
          <p className="subtitle-html">
            {modoRecuperacao ? 'Crie uma nova senha para sua conta cadastrada' : 'Entre para continuar sua jornada'}
          </p>
          </header>

          {!modoRecuperacao ? (
            <>
              <label className="field-label-html" htmlFor="login-email">
                E-mail
              </label>
              <div className="input-wrap-html">
                <span>
                  <Mail size={16} color="#1a6bff" />
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => atualizar('email', e.target.value)}
                  placeholder="voce@email.com"
                  autoComplete="email"
                />
              </div>

              <label className="field-label-html" htmlFor="login-senha">
                Senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="login-senha"
                  type="password"
                  value={form.senha}
                  onChange={(e) => atualizar('senha', e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                />
              </div>
            </>
          ) : (
            <>
              <label className="field-label-html" htmlFor="recuperar-email">
                E-mail cadastrado
              </label>
              <div className="input-wrap-html">
                <span>
                  <Mail size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-email"
                  type="email"
                  value={recuperacao.email}
                  onChange={(e) => atualizarRecuperacao('email', e.target.value)}
                  placeholder="voce@email.com"
                  autoComplete="email"
                />
              </div>

              <label className="field-label-html" htmlFor="recuperar-senha">
                Nova senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-senha"
                  type="password"
                  value={recuperacao.senha}
                  onChange={(e) => atualizarRecuperacao('senha', e.target.value)}
                  placeholder="Mínimo 8 caracteres, letra maiúscula e símbolo"
                  autoComplete="new-password"
                />
              </div>
              <div className="pw-strength-html" aria-label="Requisitos da senha">
                {requisitosRecuperacao.map((requisito, index) => (
                  <span className={index < progressoRecuperacao ? 'ativo' : ''} key={requisito.id} />
                ))}
              </div>

              <label className="field-label-html" htmlFor="recuperar-repetir-senha">
                Repetir nova senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-repetir-senha"
                  type="password"
                  value={recuperacao.repetirSenha}
                  onChange={(e) => atualizarRecuperacao('repetirSenha', e.target.value)}
                  placeholder="Repita a nova senha"
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

          {mensagem && <p className="success-visible-html">{mensagem}</p>}

          <button
            type="button"
            className="forgot-html forgot-button-html"
            onClick={() => {
              setErroConta('')
              setMensagem('')
              setTentouLogin(false)
              setTentouRecuperacao(false)
              setFeedbackFechado(false)
              setModoRecuperacao((atual) => !atual)
            }}
          >
            {modoRecuperacao ? 'Voltar para o login' : 'Esqueceu a senha?'}
          </button>

          <button className="btn-submit-html" type="submit">
            {modoRecuperacao ? 'Salvar nova senha' : 'Entrar'}
          </button>
          {!modoRecuperacao && <p className="auth-form-footer">Ainda não tem conta? <Link to="/cadastro/aluno">Cadastre-se</Link></p>}
        </form>
      </AuthSplitLayout>

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
    </>
  )
}
