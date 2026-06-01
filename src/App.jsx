import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contextos/AppContext'
import { Rotas } from './rotas/Rotas'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <Rotas />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
