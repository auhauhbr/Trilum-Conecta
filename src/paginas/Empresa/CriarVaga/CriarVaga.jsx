import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Campo } from '../../../componentes/interface/Campo'
import { useApp } from '../../../contextos/AppContext'

const formVazio = {
  titulo: '',
  descricao: '',
  requisitos: '',
  atividades: '',
  salario: '',
  tipo: 'CLT',
  nivel: 'Junior',
  modalidade: 'Remoto',
  localizacao: '',
  tags: '',
}

function vagaParaForm(vaga) {
  if (!vaga) return formVazio

  return {
    titulo: vaga.titulo || '',
    descricao: vaga.descricao || '',
    requisitos: Array.isArray(vaga.requisitos) ? vaga.requisitos.join('\n') : vaga.requisitos || '',
    atividades: Array.isArray(vaga.atividades) ? vaga.atividades.join('\n') : vaga.atividades || '',
    salario: vaga.salario || '',
    tipo: vaga.tipo || 'CLT',
    nivel: vaga.nivel || 'Junior',
    modalidade: vaga.modalidade || 'Remoto',
    localizacao: vaga.localizacao || '',
    tags: Array.isArray(vaga.tags) ? vaga.tags.join(', ') : vaga.tags || '',
  }
}

export function CriarVaga() {
  const navigate = useNavigate()
  const { vagaId } = useParams()
  const { publicarVaga, atualizarVaga, vagasEmpresa } = useApp()
  const vagaEditada = useMemo(() => vagasEmpresa.find((vaga) => vaga.id === vagaId), [vagaId, vagasEmpresa])
  const modoEdicao = Boolean(vagaId)
  const [erro, setErro] = useState('')
  const [notificacao, setNotificacao] = useState('')
  const [form, setForm] = useState(() => vagaParaForm(vagaEditada))

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setErro('')
  }

  function validarForm() {
    const erros = []
    if (!form.titulo?.trim()) erros.push('Título é obrigatório')
    if (!form.descricao?.trim()) erros.push('Descrição é obrigatória')
    if (!form.requisitos?.trim()) erros.push('Requisitos são obrigatórios')
    if (!form.salario?.trim()) erros.push('Faixa salarial é obrigatória')
    if (!form.nivel) erros.push('Nível é obrigatório')
    if (!form.modalidade) erros.push('Modalidade é obrigatória')
    
    return erros
  }

  function enviar(evento) {
    evento.preventDefault()
    const erros = validarForm()
    
    if (erros.length > 0) {
      setErro(erros.join(' • '))
      return
    }

    if (modoEdicao) {
      atualizarVaga(vagaId, form)
      setNotificacao('Vaga atualizada com sucesso!')
    } else {
      publicarVaga(form)
      setNotificacao('Vaga publicada com sucesso!')
    }
    
    setTimeout(() => navigate('/empresa/gerenciar-vagas'), 1500)
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
    <section className="pagina pagina-estreita">
      {notificacao && <div className="notificacao notificacao-sucesso">{notificacao}</div>}
      <form className="form-card empresa-form-card" onSubmit={enviar}>
        <span className="eyebrow">{modoEdicao ? 'Editar vaga' : 'Nova vaga'}</span>
        <h1>{modoEdicao ? 'Editar vaga' : 'Criar vaga'}</h1>
        <Campo label="Título da vaga" value={form.titulo} onChange={(e) => atualizar('titulo', e.target.value)} />
        <Campo label="Descrição" textarea rows="4" value={form.descricao} onChange={(e) => atualizar('descricao', e.target.value)} />
        <Campo label="Requisitos (um por linha)" textarea rows="4" value={form.requisitos} onChange={(e) => atualizar('requisitos', e.target.value)} />
        <Campo label="Atividades (uma por linha)" textarea rows="4" value={form.atividades} onChange={(e) => atualizar('atividades', e.target.value)} />
        <div className="form-grid">
          <Campo label="Faixa salarial" value={form.salario} onChange={(e) => atualizar('salario', e.target.value)} />
          <label className="campo">
            <span>Tipo</span>
            <select value={form.tipo} onChange={(e) => atualizar('tipo', e.target.value)}>
              <option>CLT</option>
              <option>PJ</option>
              <option>Estagio</option>
            </select>
          </label>
          <label className="campo">
            <span>Nível</span>
            <select value={form.nivel} onChange={(e) => atualizar('nivel', e.target.value)}>
              <option>Estagio</option>
              <option>Junior</option>
              <option>Pleno</option>
              <option>Senior</option>
            </select>
          </label>
          <label className="campo">
            <span>Modalidade</span>
            <select value={form.modalidade} onChange={(e) => atualizar('modalidade', e.target.value)}>
              <option>Remoto</option>
              <option>Hibrido</option>
              <option>Presencial</option>
            </select>
          </label>
          <Campo label="Localização" value={form.localizacao} onChange={(e) => atualizar('localizacao', e.target.value)} />
          <Campo label="Tags separadas por vírgula" value={form.tags} onChange={(e) => atualizar('tags', e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="linha-acoes">
          <Botao to="/empresa/gerenciar-vagas" variant="secondary">
            Voltar para gerenciar
          </Botao>
          <Botao type="submit">{modoEdicao ? 'Salvar alterações' : 'Publicar vaga'}</Botao>
        </div>
      </form>
    </section>
  )
}
