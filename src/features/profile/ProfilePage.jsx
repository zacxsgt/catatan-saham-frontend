import { LogOut } from 'lucide-react'
import Button from '../../components/ui/Button'
import ProfileHeader from './ProfileHeader'
import PinSection from './PinSection'
import ThemeSwitch from './ThemeSwitch'
import InvestmentReport from './InvestmentReport'
import { useProfile } from '../../hooks/useProfile'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { signOut } = useAuth()
  const { isLoading } = useProfile()

  if (isLoading) {
    return <div className="p-4 md:p-8"><p className="text-sm text-muted">Memuat...</p></div>
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <h1 className="font-heading text-2xl font-semibold text-ink mb-5">Profil</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:flex-1 flex flex-col gap-4">
          <ProfileHeader />
          <PinSection />
          <ThemeSwitch />
        </div>

        <div className="w-full md:flex-1 flex flex-col gap-4">
          <InvestmentReport />
          <Button variant="secondary" onClick={() => signOut().catch(() => {})} className="w-full">
            <LogOut size={16} />
            Keluar
          </Button>
        </div>
      </div>
    </div>
  )
}