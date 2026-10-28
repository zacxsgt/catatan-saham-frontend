export function formatRupiah(amount) {
  const value = Number(amount) || 0
  return `Rp ${value.toLocaleString('id-ID')}`
}