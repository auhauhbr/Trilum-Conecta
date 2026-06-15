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
  candidatoAtual,
  analiseCandidato,
  onEditarPerfil,
  onAutocompletarPerfil,
  onMelhorarVaga,
  onMelhorarPerfil,
}) {
  const chave = `trilum:mentor-empresa:${empresaAtual?.id || 'empresa'}:${tela}`
  const [fechado, setFechado] = useState(() => {
    const preferenciaSalva = lerStorage(chave, null)
    if (typeof preferenciaSalva === 'boolean') return preferenciaSalva

    return typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  })
  const conteudo = useMemo(() => {
    const perfil = analisarPerfilEmpresa(empresaAtual)
    const vagaBase = formularioVaga || vagaAtual
    const qualidade = vagaBase ? analisarQualidadeVaga(vagaBase) : null

    if (tela === 'lista-candidatos') {
      if (candidatoAtual && analiseCandidato) {
        return {
          mensagem: analiseCandidato.nivel === 'Alta compatibilidade'
            ? 'O perfil apresenta boa aderência aos requisitos principais. Revise projetos, currículo e evidências antes de decidir.'
            : analiseCandidato.nivel === 'Dados insuficientes'
              ? 'Ainda há poucos dados para uma conclusão. Use o dossiê para identificar o que precisa ser validado antes de decidir.'
              : 'O dossiê organiza compatibilidades, lacunas e evidências. Use essa análise como apoio, nunca como decisão automática.',
        }
      }
      return {
        mensagem:
          'Abra o perfil para consultar o dossiê de compatibilidade, revisar evidências e preparar um feedback seguro antes de alterar o status.',
      }
    }

    if ((tela === 'painel' || tela === 'perfil-empresa') && perfil.incompleto) {
      return {
        saudacao: `Diagnóstico: a força do perfil está em ${perfil.score}% (${perfil.nivel}). Próxima ação:`,
        itens: perfil.avisos,
        acao: onMelhorarPerfil
          ? { onClick: onMelhorarPerfil, label: 'Melhorar perfil' }
          : onEditarPerfil
          ? { onClick: onEditarPerfil, label: 'Atualizar perfil' }
          : { to: '/empresa/perfil', label: 'Atualizar perfil' },
        acaoSecundaria: onMelhorarPerfil && onEditarPerfil
          ? { onClick: onEditarPerfil, label: 'Editar manualmente', prefixo: 'ou' }
          : onAutocompletarPerfil
          ? { onClick: onAutocompletarPerfil, label: 'Autocompletar vazios', prefixo: 'ou' }
          : null,
      }
    }

    if (tela === 'criar-vaga' && qualidade?.erros?.length) {
      return {
        saudacao: 'Essa vaga precisa de ajustes antes de publicar:',
        itens: itensUnicos(qualidade.erros),
        acao: onMelhorarVaga ? { onClick: onMelhorarVaga, label: 'Melhorar vaga' } : null,
      }
    }

    if (tela === 'criar-vaga' && qualidade?.alertas?.length) {
      return {
        saudacao: 'Essa vaga está boa, mas pode confundir candidatos em alguns pontos:',
        itens: itensUnicos(qualidade.alertas),
        acao: onMelhorarVaga ? { onClick: onMelhorarVaga, label: 'Melhorar vaga' } : null,
      }
    }

    if (tela === 'criar-vaga' && qualidade?.sugestoes?.length) {
      return {
        saudacao: 'Essa vaga está forte. O próximo ajuste fino é melhorar a conversão:',
        itens: itensUnicos(qualidade.sugestoes),
        acao: onMelhorarVaga ? { onClick: onMelhorarVaga, label: 'Melhorar vaga' } : null,
      }
    }

    if (tela === 'criar-vaga') {
      return {
        mensagem: `Essa vaga está clara e pronta para candidatos. ${mensagemCompatibilidade}`,
        acao: onMelhorarVaga ? { onClick: onMelhorarVaga, label: 'Revisar com mentor' } : null,
      }
    }

    if (tela === 'gerenciar-vagas') {
      const semCandidatos = primeiraVagaSemCandidatos(vagas, candidatos, candidaturas)
      if (semCandidatos) {
        return {
          mensagem:
            `A vaga "${semCandidatos.titulo}" ainda não recebeu candidatos. Próxima ação: revisar título, salário, descrição e tags para melhorar a atratividade.`,
        }
      }
    }

    if (tela === 'perfil-empresa' && !perfil.incompleto && onMelhorarPerfil) {
      return {
        mensagem: `Seu perfil já está forte (${perfil.score}%). O mentor pode sugerir ajustes finos de comunicação sem alterar automaticamente os dados.`,
        acao: { onClick: onMelhorarPerfil, label: 'Revisar textos' },
      }
    }

    if (tela === 'perfil-empresa') {
      return {
        mensagem:
          `A força atual do perfil é ${perfil.score}% (${perfil.nivel}). Use os próximos ajustes indicados para aumentar a confiança antes da candidatura.`,
      }
    }

    return {
      mensagem: mensagensPorTela[tela] || mensagensPorTela.painel,
    }
  }, [analiseCandidato, candidatoAtual, candidatos, candidaturas, empresaAtual, formularioVaga, onAutocompletarPerfil, onEditarPerfil, onMelhorarPerfil, onMelhorarVaga, tela, vagaAtual, vagas])

  if (fechado) {
    return (
      <MentorCompactadoButton
        posicao="direita"
        onClick={() => {
          setFechado(false)
          salvarStorage(chave, false)
        }}
      />
    )
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
