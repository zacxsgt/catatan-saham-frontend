import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import AvatarUpload from './AvatarUpload'

export default function EditProfileModal({ open, onClose, profile, onSaveName, onUploadAvatar, saving }) {
  const [name, setName] = useState(profile?.full_name || '')
  const [error, setError] = useState('')

  async function handleSave() {
    if (!name.trim()) {
      setError('Nama tidak boleh kosong')
      return
    }
    setError('')
    await onSaveName(name.trim())
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Profil">
      <div className="flex flex-col items-center gap-4">
        <AvatarUpload avatarUrl={profile?.avatar_url} name={profile?.full_name} onUploaded={onUploadAvatar} />

        <Input
          id="edit_full_name"
          label="Nama akun"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          className="w-full"
        />

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </Modal>
  )
}