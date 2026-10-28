import { useCallback, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Camera } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { supabase } from '../../api/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { getCroppedImg } from '../../utils/cropImage'

export default function AvatarUpload({ avatarUrl, name, onUploaded }) {
  const { user } = useAuth()
  const fileInputRef = useRef(null)

  const [rawImage, setRawImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const initial = (name || user?.email || '?').charAt(0).toUpperCase()

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5MB.')
      return
    }

    setError('')
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRawImage(URL.createObjectURL(file))
  }

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  function handleCancelCrop() {
    setRawImage(null)
    setCroppedAreaPixels(null)
  }

  async function handleConfirmCrop() {
    if (!croppedAreaPixels) return
    setUploading(true)
    setError('')

    try {
      const blob = await getCroppedImg(rawImage, croppedAreaPixels)
      const path = `${user.id}/avatar.jpg`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, blob, { upsert: true, contentType: 'image/jpeg' })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const freshUrl = `${data.publicUrl}?t=${Date.now()}`

      await onUploaded(freshUrl)
      setRawImage(null)
    } catch {
      setError('Gagal mengunggah foto. Coba lagi.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="relative w-20 h-20 rounded-full bg-canvas border border-line overflow-hidden flex items-center justify-center"
        aria-label="Ganti foto profil"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading text-2xl text-ink">{initial}</span>
        )}
        <span className="absolute bottom-0 inset-x-0 bg-ink/70 text-canvas text-[10px] py-1 flex items-center justify-center gap-1">
          <Camera size={11} />
          Ganti
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-xs text-loss">{error}</p>}

      <Modal open={Boolean(rawImage)} onClose={handleCancelCrop} title="Atur Foto Profil">
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-64 bg-canvas rounded-xl overflow-hidden">
            {rawImage && (
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-ink"
            aria-label="Perbesar"
          />

          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleCancelCrop} className="flex-1" disabled={uploading}>
              Batal
            </Button>
            <Button onClick={handleConfirmCrop} className="flex-1" disabled={uploading}>
              {uploading ? 'Mengunggah...' : 'Pakai foto ini'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}