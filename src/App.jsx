
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import AddUser from './Components/AddUser'

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<AddUser/>}/>
  </Routes>
  
  </BrowserRouter>

  )
}

export default App
