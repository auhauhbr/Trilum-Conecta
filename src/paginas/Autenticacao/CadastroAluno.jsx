import { useState } from 'react'
import { CalendarDays, LockKeyhole, Mail, SquareUserRound, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSplitLayout } from '../../componentes/autenticacao/AuthSplitLayout'
import { MentorCompactadoButton } from '../../componentes/interface/MentorCompactadoButton'
import { MentorFeedback } from '../../componentes/interface/MentorFeedback'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro from '../../ativos/imagens/imagem-teste-4.png'
import {
  cpfValido,
  dataNascimentoValida,
  emailValido,
  formatarDataNascimento,
  mensagensSenha,
  primeiroNome,
  progressoSenha,
  requisitosSenha,
} from '../../servicos/validacaoAuth'

const formInicial = {
  nome: '',
  cpf: '',
  nascimento: '',
  email: '',
  repetirEmail: '',
  senha: '',
  repetirSenha: '',
}

export function CadastroAluno() {
  const navigate = useNavigate()
  const { cadastrarAluno } = useApp()
  const [form, setForm] = useState(formInicial)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [erroConta, setErroConta] = useState('')
  const [feedbackFechado, setFeedbackFechado] = useState(false)
  const requisitos = requisitosSenha(form.senha)
  const progresso = progressoSenha(form.senha)
  const nomeSaudacao = primeiroNome(form.nome)
  const itensValidacao = tentouEnviar ? validarFormulario() : []
  const itensFeedback = [...itensValidacao, ...(erroConta ? [erroConta] : [])]

  function atualizar(campo, valor) {
    const valorFinal = campo === 'nascimento' ? formatarDataNascimento(valor) : valor
    setForm((atual) => ({ ...atual, [campo]: valorFinal }))
    setErroConta('')
  }

  function validarFormulario() {
    const pendencias = []

    if (!form.nome.trim()) pendencias.push('preencha seu nome, afinal, quero lhe conhecer')
    if (!form.cpf.trim()) pendencias.push('informe seu CPF para identificação')
    else if (!cpfValido(form.cpf)) pendencias.push('seu CPF parece inválido, revise por favor')
    if (!form.nascimento.trim()) pendencias.push('qual é sua data de nascimento?')
    else if (!dataNascimentoValida(form.nascimento)) pendencias.push('use o formato dd/mm/aaaa para a data')
    if (!form.email.trim()) pendencias.push('preciso do seu e-mail para contato')
    else if (!emailValido(form.email)) pendencias.push('esse e-mail não parece válido, verifique')
    if (!form.repetirEmail.trim()) pendencias.push('confirme seu e-mail digitando novamente')
    else if (form.email && form.email !== form.repetirEmail) pendencias.push('os e-mails não estão iguais, compare aí')
    if (!form.senha) pendencias.push('cadê a senha? precisa criar uma')
    else pendencias.push(...mensagensSenha(form.senha))
    if (!form.repetirSenha) pendencias.push('confirme sua senha repetindo ela')
    else if (form.senha && form.senha !== form.repetirSenha) pendencias.push('as senhas não batem, digite igual nas duas')

    return pendencias
  }

  function saudacaoFeedback() {
    return `Ei ${nomeSaudacao || 'humano que não sei o nome'}, você precisa fazer o seguinte:`
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

    const resposta = cadastrarAluno({
      nome: form.nome.trim(),
      cpf: form.cpf.trim(),
      nascimento: form.nascimento,
      email: form.email,
      senha: form.senha,
      cargoAtual: 'Aluno em transição para TI',
      localizacao: 'Brasil',
      bio: 'Novo aluno da Trilum Conecta preparando sua transição para tecnologia.',
    })

    if (!resposta.ok) {
      setErroConta(resposta.mensagem)
      return
    }

    navigate('/aluno/questionario')
  }

  return (
    <>
      <AuthSplitLayout
        imagem={ilustracaoCadastro}
        imagemAlt="Pessoa estudando com notebook"
        etiqueta="Crie sua conta gratuita"
        titulo="Cadastre-se para começar sua jornada."
        descricao="Trilhas personalizadas, cursos e vagas compatíveis com seu perfil, tudo em um só lugar."
        beneficios={[
          'Cursos e trilhas organizados para seu momento',
          'Jornada personalizada a partir do seu perfil',
          'Vagas compatíveis com suas habilidades e objetivo',
        ]}
      >
        <form className="cadastro-card-html" onSubmit={enviar} noValidate>
          <header className="auth-form-header">
            <span>Bem-vindo à Trilum</span>
            <h2>Criar conta</h2>
            <p>Preencha seus dados para começar.</p>
          </header>
          <div className="tab-switch-html">
            <button className="active" type="button">
              Aluno
            </button>
            <Link to="/cadastro/empresa">Empresa</Link>
          </div>

          <label className="field-label-html" htmlFor="aluno-nome">
            Nome completo
          </label>
          <div className="input-wrap-html">
            <span>
              <UserRound size={16} color="#1a6bff" />
            </span>
            <input id="aluno-nome" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} />
          </div>

          <label className="field-label-html" htmlFor="aluno-cpf">
            CPF
          </label>
          <div className="input-wrap-html">
            <span>
              <SquareUserRound size={16} color="#1a6bff" />
            </span>
            <input id="aluno-cpf" value={form.cpf} onChange={(e) => atualizar('cpf', e.target.value)} />
          </div>

          <label className="field-label-html" htmlFor="aluno-nascimento">
            Data de nascimento
          </label>
          <div className="input-wrap-html">
            <span>
              <CalendarDays size={16} color="#1a6bff" />
            </span>
            <input
              id="aluno-nascimento"
              type="text"
              value={form.nascimento}
              onChange={(e) => atualizar('nascimento', e.target.value)}
              placeholder="dd/mm/aaaa"
              inputMode="numeric"
              maxLength="10"
            />
          </div>

          <label className="field-label-html" htmlFor="aluno-email">
            E-mail
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="aluno-email"
              type="email"
              value={form.email}
              onChange={(e) => atualizar('email', e.target.value)}
              autoComplete="email"
            />
          </div>

          <label className="field-label-html" htmlFor="aluno-repetir-email">
            Repetir e-mail
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="aluno-repetir-email"
              type="email"
              value={form.repetirEmail}
              onChange={(e) => atualizar('repetirEmail', e.target.value)}
              autoComplete="email"
            />
          </div>

          <label className="field-label-html" htmlFor="aluno-senha">
            Senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="aluno-senha"
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

          <label className="field-label-html" htmlFor="aluno-repetir-senha">
            Repetir senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="aluno-repetir-senha"
              type="password"
              value={form.repetirSenha}
              onChange={(e) => atualizar('repetirSenha', e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button className="btn-submit-html" type="submit">
            Cadastrar
          </button>
          <p className="auth-form-footer">Já tem uma conta? <Link to="/entrar">Entrar</Link></p>
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
