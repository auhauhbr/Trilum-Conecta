export {
  analisarForcaPerfilEmpresa,
  analisarForcaPerfilEmpresa as analisarPerfilEmpresa,
  analisarQualidadeVaga,
} from './empresaInteligencia'

export function textoParecePlaceholder(valor = '') {
  const texto = String(valor || '').trim().toLowerCase()
  return !texto || texto.length < 8 || ['texto', 'textotexto', 'dd', 'sasas', 'sdsd', 'teste', 'lorem ipsum'].includes(texto)
}
