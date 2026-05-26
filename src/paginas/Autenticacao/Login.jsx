import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro3 from '../../ativos/imagens/imagem-teste-9.png'
import ilustracaoCadastro4 from '../../ativos/imagens/imagem-teste-8.png'

export function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ email: 'aluno@riseup.com', senha: 'Aluno@123' })
  const [erro, setErro] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    const resposta = login(form.email, form.senha)
    if (!resposta.ok) {
      setErro(resposta.mensagem)
      return
    }
    navigate(resposta.usuario.tipo === 'empresa' ? '/empresa/painel' : '/aluno/painel')
  }

  return (
    <section className="auth-html login-page-html">
      <div className="login-hero-html">
        <div className="login-headline-html">
          <h1>Seu próximo passo profissional começa <br/> <span class="destaque-login">aqui. </span></h1>
          <br></br>
          <p> <span class="destaque-login-2">Transforme experiência em novas oportunidades.</span></p>
        </div>

        <div className="login-illustration-html">
          <img src={ilustracaoCadastro4} 
          alt="Ilustração de pessoas interagindo com tecnologia" />
        </div>

        <div className="login-illustration-html-center">
          <img src={ilustracaoCadastro3} 
          alt="Ilustração de pessoas interagindo com tecnologia" />
        </div>

        <form className="login-card-html" onSubmit={enviar}>
          <h2>Login</h2>
          <p className="subtitle-html">Entre para continuar sua jornada</p>

          <label className="field-label-html">Email</label>
          <div className="input-wrap-html">
            <span><Mail size={16} color="#1a6bff" /></span>
            <input type="email" value={form.email} onChange={(e) => atualizar('email', e.target.value)} placeholder="admin@admin.com" />
          </div>

          <label className="field-label-html">Senha</label>
          <div className="input-wrap-html">
            <span><LockKeyhole size={16} color="#1a6bff" /></span>
            <input type="password" value={form.senha} onChange={(e) => atualizar('senha', e.target.value)} placeholder="••••••••" />
          </div>

          {erro && <p className="error-visible-html">{erro}</p>}
          <a href="#recuperar" className="forgot-html">Esqueceu a senha?</a>
          <button className="btn-submit-html" type="submit">→ Entrar</button>
        </form>
      </div>
    </section>
  )
}
