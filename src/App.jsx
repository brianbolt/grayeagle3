import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './theme'
import Home from './pages/Home'
import Condo from './pages/Condo'
import Explore from './pages/Explore'
import Guide from './pages/Guide'
import Book from './pages/Book'
import Live from './pages/Live'

// Shared by the browser app and the build-time pre-renderer (entry-server.jsx).
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="condo" element={<Condo />} />
        <Route path="explore" element={<Explore />} />
        <Route path="guide" element={<Guide />} />
        <Route path="book" element={<Book />} />
        <Route path="live" element={<Live />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
