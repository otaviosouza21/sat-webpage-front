export function formataTelefone(telefone) {
  return `${telefone.substring(0, 2)} ${telefone.substring(
    2,
    6
  )}-${telefone.substring(6, 10)}`;
}
