import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import MobileHeader from './MobileHeader'

export default function AppShell({ children }) {
  return (
    <div className="min-h-dvh bg-canvas md:flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileHeader />
        <main className="flex-1 pb-24 md:pb-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}