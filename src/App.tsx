import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'

function App() {

  return (
    <Provider store={store()}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
