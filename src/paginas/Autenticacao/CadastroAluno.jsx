import { useState } from 'react'
import { CalendarDays, LockKeyhole, Mail, SquareUserRound, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import { modoApresentacao } from '../../dados/usuarios'

export function CadastroAluno() {
  const navigate = useNavigate()
  const { cadastrarAluno } = useApp()
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    email: '',
    repetirEmail: '',
    senha: '',
    repetirSenha: '',
  })
  const [erro, setErro] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function senhaValida(senha) {
    return senha.length >= 8 && /[A-Z]/.test(senha) && /[^A-Za-z0-9]/.test(senha)
  }

  function enviar(evento) {
    evento.preventDefault()
    if (!Object.values(form).every(Boolean)) return setErro('Preencher campo obrigatorio.')
    if (form.email !== form.repetirEmail) return setErro('Os e-mails precisam ser iguais.')
    if (!form.email.includes('@') || !form.email.includes('.com')) return setErro('E-mail invalido.')
    if (form.senha !== form.repetirSenha) return setErro('As senhas precisam ser iguais.')
    if (!senhaValida(form.senha)) return setErro('A senha nao cumpre todos os criterios (Mm, #, min. 8).')

    cadastrarAluno({
      nome: form.nome,
      cpf: form.cpf,
      nascimento: form.nascimento,
      email: form.email,
      senha: form.senha,
      cargoAtual: 'Aluno em transicao para TI',
      localizacao: 'Brasil',
      bio: 'Novo aluno da RiseUp preparando sua transicao para tecnologia.',
    })
    navigate('/aluno/questionario')
  }

  return (
    <section className="auth-html cadastro-page-html">
      <span className="deco-html deco-1">⭐</span>
      <span className="deco-html deco-2">⭐</span>
      <span className="deco-html deco-3">✦</span>
      <span className="deco-html deco-4">💡</span>
      <span className="deco-html deco-5">☁️</span>
      <h1 className="cadastro-title-html">Cadastre-se <span>para começar sua jornada!</span></h1>

      <form className="cadastro-card-html" onSubmit={enviar}>
        <div className="tab-switch-html">
          <button className="active" type="button">Aluno</button>
          {!modoApresentacao.ativo && <Link to="/cadastro/empresa">Empresa</Link>}
        </div>

        <label className="field-label-html">Nome completo</label>
        <div className="input-wrap-html"><span><UserRound size={16} color="#1a6bff" /></span><input value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} /></div>
        <label className="field-label-html">CPF</label>
        <div className="input-wrap-html"><span><SquareUserRound size={16} color="#1a6bff" /></span><input value={form.cpf} onChange={(e) => atualizar('cpf', e.target.value)} /></div>
        <label className="field-label-html">Data de nascimento</label>
        <div className="input-wrap-html"><span><CalendarDays size={16} color="#1a6bff" /></span><input type="date" value={form.nascimento} onChange={(e) => atualizar('nascimento', e.target.value)} /></div>
        <label className="field-label-html">Email</label>
        <div className="input-wrap-html"><span><Mail size={16} color="#1a6bff" /></span><input type="email" value={form.email} onChange={(e) => atualizar('email', e.target.value)} /></div>
        <label className="field-label-html">Repetir email</label>
        <div className="input-wrap-html"><span><Mail size={16} color="#1a6bff" /></span><input type="email" value={form.repetirEmail} onChange={(e) => atualizar('repetirEmail', e.target.value)} /></div>
        <label className="field-label-html">Senha</label>
        <div className="input-wrap-html"><span><LockKeyhole size={16} color="#1a6bff" /></span><input type="password" value={form.senha} onChange={(e) => atualizar('senha', e.target.value)} /></div>
        <div className="pw-strength-html"><span /><span /><span /><span /></div>
        <label className="field-label-html">Repetir senha</label>
        <div className="input-wrap-html"><span><LockKeyhole size={16} color="#1a6bff" /></span><input type="password" value={form.repetirSenha} onChange={(e) => atualizar('repetirSenha', e.target.value)} /></div>
        {erro && <p className="erro">{erro}</p>}
        <button className="btn-submit-html" type="submit">→ Cadastrar</button>
      </form>
    </section>
  )
}
