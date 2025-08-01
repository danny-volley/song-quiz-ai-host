import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Sandbox from './pages/Sandbox'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Sandbox />} />
      </Routes>
    </Layout>
  )
}

export default App