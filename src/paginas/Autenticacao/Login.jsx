import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'

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
          <h1>Seu próximo passo<br />profissional começa<br />aqui.</h1>
          <p>Transforme experiência em novas oportunidades</p>
        </div>

        <div className="login-illustration-html">
          <svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="350" cy="400" rx="280" ry="22" fill="rgba(255,255,255,0.18)" />
            <ellipse cx="310" cy="260" rx="230" ry="170" fill="rgba(255,255,255,0.22)" />
            <rect x="100" y="340" width="6" height="50" rx="3" fill="#1a6bff" />
            <rect x="80" y="348" width="46" height="6" rx="3" fill="#1a6bff" />
            <rect x="240" y="340" width="6" height="50" rx="3" fill="#1a6bff" />
            <rect x="220" y="348" width="46" height="6" rx="3" fill="#1a6bff" />
            <rect x="380" y="340" width="6" height="50" rx="3" fill="#1a6bff" />
            <rect x="360" y="348" width="46" height="6" rx="3" fill="#1a6bff" />
            <rect x="520" y="340" width="6" height="50" rx="3" fill="#1a6bff" />
            <rect x="500" y="348" width="46" height="6" rx="3" fill="#1a6bff" />
            <g transform="translate(95,180) rotate(-12)"><circle cx="20" cy="0" r="18" fill="#f5c842" /><rect x="4" y="18" width="32" height="36" rx="8" fill="#f5c842" /><rect x="6" y="54" width="12" height="30" rx="6" fill="#3b5bdb" /><rect x="22" y="54" width="12" height="30" rx="6" fill="#3b5bdb" /></g>
            <g transform="translate(270,165) rotate(-8)"><circle cx="20" cy="0" r="18" fill="#f0c0a0" /><rect x="4" y="18" width="32" height="34" rx="8" fill="#e8518a" /><rect x="6" y="52" width="12" height="28" rx="6" fill="#2dbf8e" /><rect x="22" y="52" width="12" height="28" rx="6" fill="#2dbf8e" /></g>
            <g transform="translate(430,158) rotate(-5)"><circle cx="20" cy="0" r="19" fill="#e8b090" /><rect x="3" y="18" width="34" height="36" rx="8" fill="#3a9a5c" /><rect x="5" y="54" width="13" height="30" rx="6" fill="#9b4dff" /><rect x="22" y="54" width="13" height="30" rx="6" fill="#9b4dff" /></g>
            <rect x="28" y="330" width="26" height="40" rx="4" fill="white" opacity="0.7" />
            <ellipse cx="41" cy="310" rx="22" ry="30" fill="#4caf50" opacity="0.85" />
            <ellipse cx="480" cy="110" rx="40" ry="22" fill="white" opacity="0.75" />
            <ellipse cx="200" cy="80" rx="36" ry="20" fill="white" opacity="0.65" />
            <rect x="340" y="120" width="52" height="52" rx="5" fill="rgba(255,255,255,0.40)" />
            <rect x="402" y="120" width="52" height="52" rx="5" fill="rgba(255,255,255,0.40)" />
          </svg>
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
          <div className="auth-links html-auth-links">
            <button type="button" onClick={() => setForm({ email: 'aluno@riseup.com', senha: 'Aluno@123' })}>Demo aluno</button>
            <button type="button" onClick={() => setForm({ email: 'empresa@riseup.com', senha: 'Empresa@123' })}>Demo empresa</button>
          </div>
        </form>
      </div>
    </section>
  )
}
