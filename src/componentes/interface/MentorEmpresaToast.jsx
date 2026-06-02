import { useMemo, useState } from 'react'
import { contarCandidatosDaVaga } from '../../servicos/candidaturas'
import { analisarPerfilEmpresa, analisarQualidadeVaga } from '../../servicos/qualidadeVaga'
import { lerStorage, salvarStorage } from '../../servicos/storage'
import { MentorCompactadoButton } from './MentorCompactadoButton'
import { MentorFeedback } from './MentorFeedback'

const mensagemCompatibilidade =
  'As tags da vaga ajudam o sistema a comparar a oportunidade com o perfil dos alunos. Elas cruzam com área desejada, tecnologias estudadas e respostas do wizard. Use tags reais do dia a dia da vaga.'

const mensagensPorTela = {
  painel:
    'Aqui você acompanha vagas publicadas, vagas ativas e candidatos recebidos pela empresa. Mantenha oportunidades encerradas fora do ar para deixar o painel organizado.',
  'criar-vaga':
    'Crie uma vaga clara: título direto, descrição com contexto, requisitos realistas, faixa salarial, modalidade e tags de tecnologia bem escolhidas.',
  'gerenciar-vagas':
    'Aqui você acompanha todas as vagas publicadas, candidatos e status de cada oportunidade. Se uma vaga recebe poucos candidatos, revise título, salário, descrição e tags.',
  'lista-candidatos':
    'Nesta tela você avalia pessoas candidatas e acompanha status. Clique em Ver perfil para abrir o perfil do aluno; dentro dele você pode exportar o currículo atualizado em PDF.',
  'perfil-empresa':
    'O perfil da empresa é a vitrine para os alunos. Explique quem vocês são, quais tecnologias usam e por que vale a pena se candidatar.',
}

function primeiraVagaSemCandidatos(vagas = [], candidatos = [], candidaturas = []) {
  return vagas.find((vaga) => contarCandidatosDaVaga(vaga.id, candidatos, candidaturas) === 0)
}

function itensUnicos(itens = []) {
  return [...new Set(itens.filter(Boolean))].slice(0, 6)
}

export function MentorEmpresaToast({
  empresaAtual,
  tela,
  vagaAtual,
  vagas = [],
  candidatos = [],
  candidaturas = [],
  formularioVaga,
  onEditarPerfil,
  onAutocompletarPerfil,
}) {
  const chave = `trilum:mentor-empresa:${empresaAtual?.id || 'empresa'}:${tela}`
  const [fechado, setFechado] = useState(() => lerStorage(chave, false))
  const conteudo = useMemo(() => {
    const perfil = analisarPerfilEmpresa(empresaAtual)
    const vagaBase = formularioVaga || vagaAtual
    const qualidade = vagaBase ? analisarQualidadeVaga(vagaBase) : null

    if (tela === 'lista-candidatos') {
      return {
        mensagem:
          'Nesta tela voce avalia pessoas candidatas e acompanha status. Clique em Ver perfil para abrir o perfil do aluno; dentro dele voce pode exportar o currículo atualizado em PDF.',
      }
    }

    if ((tela === 'painel' || tela === 'perfil-empresa') && perfil.incompleto) {
      return {
        saudacao: 'Ei, pessoal da empresa, antes de acelerar as vagas vale revisar isso:',
        itens: perfil.avisos,
        acao: onEditarPerfil
          ? { onClick: onEditarPerfil, label: 'Atualizar perfil' }
          : { to: '/empresa/perfil', label: 'Atualizar perfil' },
        acaoSecundaria: onAutocompletarPerfil
          ? { onClick: onAutocompletarPerfil, label: 'Autocompletar vazios', prefixo: 'ou' }
          : null,
      }
    }

    if (tela === 'criar-vaga' && qualidade?.avisos?.length) {
      return {
        saudacao: 'Ei, essa vaga pode ficar mais forte com estes ajustes:',
        itens: itensUnicos([...qualidade.avisos, ...qualidade.dicas]),
      }
    }

    if (tela === 'criar-vaga') {
      return {
        mensagem: mensagemCompatibilidade,
      }
    }

    if (tela === 'gerenciar-vagas') {
      const semCandidatos = primeiraVagaSemCandidatos(vagas, candidatos, candidaturas)
      if (semCandidatos) {
        return {
          mensagem:
            'Uma das vagas ainda nao recebeu candidatos. Revise se o titulo esta claro, se o salário aparece e se as tecnologias estão bem marcadas.',
        }
      }
    }

    if (tela === 'perfil-empresa') {
      return {
        mensagem:
          'Use o perfil para mostrar produto, mercado, stack, diferenciais e hub principal. Isso aumenta a confiança antes da candidatura.',
      }
    }

    return {
      mensagem: mensagensPorTela[tela] || mensagensPorTela.painel,
    }
  }, [candidatos, candidaturas, empresaAtual, formularioVaga, onAutocompletarPerfil, onEditarPerfil, tela, vagaAtual, vagas])

  if (fechado) {
    return <MentorCompactadoButton posicao="direita" onClick={() => setFechado(false)} />
  }

  function fechar() {
    setFechado(true)
    salvarStorage(chave, true)
  }

  return (
    <MentorFeedback
      titulo="Mentor"
      saudacao={conteudo.saudacao}
      itens={conteudo.itens || []}
      mensagem={conteudo.mensagem}
      acao={conteudo.acao}
      acaoSecundaria={conteudo.acaoSecundaria}
      posicao="direita"
      onClose={fechar}
    />
  )
}
