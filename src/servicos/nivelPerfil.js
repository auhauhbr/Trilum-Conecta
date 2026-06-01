const XP = {
    cursoConcluido: 100,
    certificado: 50,
    candidatura: 20,
    onboarding: 30,
}

const NOMES_NIVEIS = [
    'passos', 
    'explorador',
    'aprendiz',
    'construtor',
    'perfil emn destaque',
    'Talento baum',
    'homelander de talentpo',
]

function calcularNivelPorXp(xpTotal) {
    let nivel = 1
    let inicioDoNivel = 0
    let xpNecessario = 120

    while (xpTotal >= inicioDoNivel + xpNecessario){
        inicioDoNivel += xpNecessario
        nivel += 1
        xpNecessario += 60
    }

    const xpNoNivel = xpTotal - inicioDoNivel

    return{
        nivel,
        proximoNivel: nivel + 1,
        nomeNivel: NOMES_NIVEIS[Math.min(nivel - 1,  NOMES_NIVEIS.length - 1)],
        xpNoNivel,
        xpParaProximoNivel: xpNecessario,
        percentualProgresso: Math.round((xpNoNivel / xpNecessario) * 100),
    }

}

export function calcularNivelPerfil({
    cursosComProgresso = [],
    certificados = [],
    candidaturas = [],
    respostasWizard = {},
    perguntasWizard = [],
    usuarioId,

}) {
    const cursosConcluidos = cursosComProgresso.filter(
        (curso) => !usuarioId || curso.alunoId === usuarioId || !curso.alunoId,
    )
    const candidaturaDoUsuario = candidaturas.filter(
        (candidatura) => !usuarioId || candidatura.alunoId === usuarioId,
    )


    const onboardingCompleto = perguntasWizard.length ? perguntasWizard.every((pergunta) => respostasWizard[pergunta.id]) : false

    const xpCursos = cursosConcluidos.length * XP.cursoConcluido
    const xpCertificados = certificados.length * XP.certificado
    const xpCandidaturas = candidaturaDoUsuario.length * XP.candidatura
    const xpOnboarding = onboardingCompleto ? XP.onboarding : 0
    const xpTotal = xpCursos + xpCertificados + xpCandidaturas + xpOnboarding

    return {
        ...calcularNivelPorXp(xpTotal),
        xpTotal,
        fontes: [
            { label : 'Cursos concluídos', valor: cursosConcluidos.length, xp: xpCursos},
            { label : ' Certificados', valor: certificados.length, xp: xpCertificados},
            { label : 'candidaturas', valor: candidaturaDoUsuario.length, xp: xpCandidaturas},
            { label : 'onboarding', valor: onboardingCompleto ? 1 : 0, xp: xpOnboarding},
        ],
    }
}
