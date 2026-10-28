import { useState } from 'react'
import { Pencil } from 'lucide-react'
import Card from '../../components/ui/Card'
import EditProfileModal from './EditProfileModal'
import { useProfile, useUpdateProfile } from '../../hooks/useProfile'
import { useAuth } from '../../context/AuthContext'

export default function ProfileHeader() {
  const { user } = useAuth()
  const { data: profile } = useProfile()
  const updateProfile = useUpdateProfile()
  const [modalOpen, setModalOpen] = useState(false)

  const displayName = profile?.full_name || user?.email?.split('@')[0] || ''
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <Card className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-canvas border border-line overflow-hidden flex items-center justify-center shrink-0">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading text-xl text-ink">{initial}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-ink truncate">{displayName}</p>
        <p className="text-xs text-muted truncate">{user?.email}</p>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 text-xs text-ink hover:opacity-70 shrink-0"
      >
        <Pencil size={13} />
        Edit
      </button>

      <EditProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        profile={profile}
        saving={updateProfile.isPending}
        onSaveName={(full_name) => updateProfile.mutateAsync({ full_name })}
        onUploadAvatar={(avatar_url) => updateProfile.mutateAsync({ avatar_url })}
      />
    </Card>
  )
}