import logo from '../../assets/logo.png' // ganti ke logo.png kalau file Anda PNG

export default function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src={logo}
      width={size}
      height={size}
      alt="Catatan Saham"
      className={`object-contain ${className}`}
    />
  )
}