import { useState } from 'react'
import { CalendarDays, LockKeyhole, Mail, SquareUserRound, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro from '../../ativos/imagens/imagem-teste-4.png'
import ilustracaoCadastro2 from '../../ativos/imagens/imagem-teste-2.png'

const formInicial = {
  nome: '',
  cpf: '',
  nascimento: '',
  email: '',
  repetirEmail: '',
  senha: '',
  repetirSenha: '',
}

function senhaValida(senha) {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[^A-Za-z0-9]/.test(senha)
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function CadastroAluno() {
  const navigate = useNavigate()
  const { cadastrarAluno } = useApp()
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setErro('')

    if (!Object.values(form).every(Boolean)) return setErro('Preencha todos os campos obrigatórios.')
    if (!emailValido(form.email)) return setErro('Informe um e-mail válido.')
    if (form.email !== form.repetirEmail) return setErro('Os e-mails precisam ser iguais.')
    if (form.senha !== form.repetirSenha) return setErro('As senhas precisam ser iguais.')
    if (!senhaValida(form.senha)) {
      return setErro('Use uma senha com pelo menos 8 caracteres, uma letra maiúscula e um símbolo.')
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
      setErro(resposta.mensagem)
      return
    }

    navigate('/aluno/questionario')
  }

  return (
    <section className="auth-html cadastro-page-html">
      <h1 className="cadastro-title-html">
        Cadastre-se <span>para começar sua jornada!</span>
      </h1>

      <div className="cadastro-container-layout">
        <div className="coluna-imagem lateral-esquerda">
          <img src={ilustracaoCadastro} alt="Ilustração de boas-vindas para novos alunos" />
        </div>

        <form className="cadastro-card-html" onSubmit={enviar}>
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
            <input id="aluno-nome" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} required />
          </div>

          <label className="field-label-html" htmlFor="aluno-cpf">
            CPF
          </label>
          <div className="input-wrap-html">
            <span>
              <SquareUserRound size={16} color="#1a6bff" />
            </span>
            <input id="aluno-cpf" value={form.cpf} onChange={(e) => atualizar('cpf', e.target.value)} required />
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
              type="date"
              value={form.nascimento}
              onChange={(e) => atualizar('nascimento', e.target.value)}
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="pw-strength-html">
            <span />
            <span />
            <span />
            <span />
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
              required
            />
          </div>

          {erro && <p className="error-visible-html">{erro}</p>}
          <button className="btn-submit-html" type="submit">
            Cadastrar
          </button>
        </form>

        <div className="coluna-imagem lateral-direita">
          <img src={ilustracaoCadastro2} alt="Ilustração de boas-vindas para novos alunos" />
        </div>
      </div>
    </section>
  )
}
