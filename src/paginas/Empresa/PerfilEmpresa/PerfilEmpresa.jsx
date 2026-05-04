import { Building2, Camera, LogOut, Save, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Campo } from '../../../componentes/interface/Campo'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'

function dadosEmpresa(usuario) {
  return {
    nome: usuario?.nome || '',
    descricao: usuario?.descricao || '',
    localizacao: usuario?.localizacao || '',
    site: usuario?.site || '',
    logo: usuario?.logo || '',
    logoUrl: usuario?.logoUrl || '',
    capa: usuario?.capa || '',
    capaUrl: usuario?.capaUrl || '',
  }
}

function statusClasse(status) {
  return status === 'ativa' ? 'status-chip status-ativa' : 'status-chip status-encerrada'
}

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

export function PerfilEmpresa() {
  const navigate = useNavigate()
  const { usuarioAtual, atualizarEmpresa, vagasEmpresa, logout } = useApp()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(() => dadosEmpresa(usuarioAtual))
  const vagas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id || usuarioAtual?.id === 'empresa-1')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function salvar() {
    atualizarEmpresa(form)
    setEditando(false)
  }

  function cancelar() {
    setForm(dadosEmpresa(usuarioAtual))
    setEditando(false)
  }

  function selecionarImagem(campo, evento) {
    const arquivo = evento.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar(campo, leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function sair() {
    logout()
    navigate('/')
  }

  return (
    <section className="pagina perfil-empresa-page">
      {editando ? (
        <section className="empresa-editar-perfil">
          <header>
            <h1>
              <Building2 size={28} /> Editar Perfil da Empresa
            </h1>
            <button type="button" onClick={cancelar} aria-label="Fechar edição">
              <X size={32} />
            </button>
          </header>

          <div className="empresa-editar-grid">
            <label className="empresa-upload-box">
              <span>Logo de perfil Empresa</span>
              <strong>
                <Camera size={16} /> Escolher Logo
              </strong>
              <small>PNG ou JPG • Máx. 2MB</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('logoUrl', evento)} />
            </label>

            <label className="empresa-upload-box empresa-upload-bg">
              <span>Escolher background</span>
              <strong>
                <Camera size={16} /> Escolher Foto
              </strong>
              <small>PNG ou JPG • Máx. 2MB</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('capaUrl', evento)} />
            </label>

            <Campo label="Nome da empresa" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} />
            <Campo label="Logo (iniciais, caso não tenha imagem)" value={form.logo} onChange={(e) => atualizar('logo', e.target.value)} />
            <Campo label="Descrição da Empresa" textarea rows="5" value={form.descricao} onChange={(e) => atualizar('descricao', e.target.value)} />
            <Campo label="Localização" value={form.localizacao} onChange={(e) => atualizar('localizacao', e.target.value)} />
            <Campo label="Website" value={form.site} onChange={(e) => atualizar('site', e.target.value)} />
          </div>

          <div className="empresa-editar-acoes">
            <Botao variant="secondary" onClick={cancelar}>
              <X size={18} /> Cancelar edições
            </Botao>
            <Botao onClick={salvar}>
              <Save size={18} /> Atualizar perfil
            </Botao>
          </div>
        </section>
      ) : (
        <>
          <div className="perfil-empresa-hero" style={{ background: form.capaUrl ? undefined : form.capa || usuarioAtual?.capa }}>
            {form.capaUrl && <img className="empresa-capa-img" src={form.capaUrl} alt="" />}
            <div className="perfil-empresa-overlay">
              <Avatar texto={form.logo || 'EM'} imagem={form.logoUrl} grande />
              <div>
                <span className="eyebrow">Perfil da empresa</span>
                <h1>{form.nome}</h1>
                <p>{form.descricao}</p>
              </div>
              <div className="perfil-empresa-acoes">
                <Botao className="botao botao-primary botao-quadrado" onClick={() => setEditando(true)}>
                  Atualizar perfil
                </Botao>
                <Botao className="botao botao-secondary botao-quadrado" variant="secondary" onClick={sair}>
                  <LogOut size={17} /> Sair
                </Botao>
              </div>
            </div>
          </div>

          <section className="perfil-empresa-vagas">
            <div className="secao-cabecalho linha">
              <h2>Vagas divulgadas:</h2>
              <Botao className="botao botao-secondary botao-quadrado" to="/empresa/gerenciar-vagas" variant="secondary">
                Gerenciar vagas
              </Botao>
            </div>
            <div className="perfil-empresa-vagas-grid">
              {vagas.map((vaga) => (
                <Link className="perfil-empresa-vaga-card" key={vaga.id} to={`/empresa/vagas/${vaga.id}/candidatos`}>
                  <div className="empresa-vaga-titulo">
                    <Avatar texto={usuarioAtual?.logo || 'EM'} imagem={usuarioAtual?.logoUrl} />
                    <div>
                      <small>{usuarioAtual?.nome}</small>
                      <strong>{vaga.titulo}</strong>
                    </div>
                  </div>
                  <span>Número de candidato:</span>
                  <strong className="contador-redondo">{vaga.candidatos || 0}</strong>
                  <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  )
}
