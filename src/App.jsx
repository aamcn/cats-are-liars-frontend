
import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/navbar/NavBar'

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Outlet />
      </div>
     
    </>
  )
}

export default App
