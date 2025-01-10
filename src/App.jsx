import './App.css'
import Chat from './components/chat/chat'
import List from './components/list/list'
import Detail from './components/detail/detail'

function App() {

  return (
    <div className="container">
      <List />
      <Chat />
      <Detail/>
    </div>
  )
}

export default App
