import { HashRouter } from 'react-router-dom'
import { AppProvider } from './contextos/AppContext'
import { Rotas } from './rotas/Rotas'
import './App.css'

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Rotas />
      </AppProvider>
    </HashRouter>
  )
}

export default App
