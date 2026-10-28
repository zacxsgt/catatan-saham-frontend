import { useEffect, useRef, useState } from 'react'
import LogoMark from '../../components/ui/LogoMark'

const WORDS = ['Saham', 'Uang', 'Keuntungan']
const WORD_MS = 1200 // lama tiap kata tampil
const FADE_MS = 500 // lama layar memudar di akhir

export default function SplashScreen({ onFinish }) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const timers = []
    for (let i = 1; i < WORDS.length; i++) {
      timers.push(setTimeout(() => setIndex(i), i * WORD_MS))
    }
    timers.push(setTimeout(() => setLeaving(true), WORDS.length * WORD_MS))
    timers.push(
      setTimeout(() => onFinishRef.current?.(), WORDS.length * WORD_MS + FADE_MS)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#101113] text-[#F2F1ED]"
      style={{ opacity: leaving ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
    >
      <LogoMark size={220} className="-my-8" />
      <h1 className="font-heading text-4xl font-semibold text-center leading-tight">
        Catatan
        <span className="block h-[1.25em]">
          <span key={index} className="splash-word">
            {WORDS[index]}
          </span>
        </span>
      </h1>
    </div>
  )
}