import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import HomeRoute from '../pages/HomeRoute'
import AnalysisRoute from '../pages/AnalysisRoute'
import ScheduleRoute from '../pages/ScheduleRoute'
import HistoryRoute from '../pages/HistoryRoute'
import ProfileRoute from '../pages/ProfileRoute'
import TradeRoute from '../pages/TradeRoute'

export default function AppRouter() {
  return (
    <AppShell>
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomeRoute />} />
        <Route path="analysis" element={<AnalysisRoute />} />
        <Route path="schedule" element={<ScheduleRoute />} />
        <Route path="history" element={<HistoryRoute />} />
        <Route path="profile" element={<ProfileRoute />} />
        <Route path="trade/:mode" element={<TradeRoute />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AppShell>
  )
}