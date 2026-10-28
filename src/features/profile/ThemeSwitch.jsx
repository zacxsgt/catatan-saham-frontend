import { Sun, Moon } from 'lucide-react'
import Card from '../../components/ui/Card'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className="flex items-center justify-between">
      <span className="text-sm text-ink">Tema</span>
      <button
        onClick={toggleTheme}
        aria-label="Ganti tema"
        className="relative w-14 h-7 rounded-full bg-canvas border border-line flex items-center px-1"
      >
        <span
          className="absolute w-5 h-5 rounded-full bg-ink flex items-center justify-center text-canvas transition-transform duration-200"
          style={{ transform: isDark ? 'translateX(26px)' : 'translateX(0)' }}
        >
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </span>
      </button>
    </Card>
  )
}