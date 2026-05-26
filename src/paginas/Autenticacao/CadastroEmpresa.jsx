import { useState } from 'react'
import { Building2, LockKeyhole, Mail, SquareUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import { modoApresentacao } from '../../dados/usuarios'
import ilustracaoCadastro from '../../ativos/imagens/imagem-teste-4.png'
import ilustracaoCadastro2 from '../../ativos/imagens/imagem-teste-2.png'


export function CadastroEmpresa() {
  const navigate = useNavigate()
  const { cadastrarEmpresa } = useApp()
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    email: '',
    repetirEmail: '',
    senha: '',
    repetirSenha: '',
    localizacao: '',
    site: '',
    descricao: '',
  })
  const [erro, setErro] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    if (!form.nome || !form.cnpj || !form.email || !form.senha) return setErro('Preencher campo obrigatorio.')
    if (form.email !== form.repetirEmail) return setErro('Os e-mails precisam ser iguais.')
    if (form.senha !== form.repetirSenha) return setErro('As senhas precisam ser iguais.')
    if (form.senha.length < 8 || !/[A-Z]/.test(form.senha) || !/[^A-Za-z0-9]/.test(form.senha)) {
      return setErro('A senha nao cumpre todos os criterios (Mm, #, min. 8).')
    }

    cadastrarEmpresa(form)
    navigate('/empresa/painel')
  }

  return (
    <section className="auth-html cadastro-page-html">
      <h1 className="cadastro-title-html">Cadastre-se <span>para começar sua jornada!</span></h1>

      <div className="cadastro-container-layout">
        <div className="coluna-imagem lateral-esquerda">
          <img
            src={ilustracaoCadastro} 
            alt="Ilustração de boas-vindas para novos alunos" />
        </div>

        <form className="cadastro-card-html" onSubmit={enviar}>
          <div className="tab-switch-html">
            <Link to="/cadastro/aluno">Aluno</Link>
            <button className="active" type="button">Empresa</button>
          </div>

          <label className="field-label-html">Razão social</label>
          <div className="input-wrap-html"><span><Building2 size={16} color="#1a6bff" /></span><input value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} /></div>
          <label className="field-label-html">CNPJ</label>
          <div className="input-wrap-html"><span><SquareUserRound size={16} color="#1a6bff" /></span><input value={form.cnpj} onChange={(e) => atualizar('cnpj', e.target.value)} /></div>
          <label className="field-label-html">Email corporativo</label>
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

        <div className="coluna-imagem lateral-direita">
          <img
            src={ilustracaoCadastro2} 
            alt="Ilustração de boas-vindas para novas empresas" />
        </div>
      </div>
    </section>
  )
}
