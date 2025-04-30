
import { Outlet } from 'react-router'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'

function App() {

  return (
    <>
      <div>
        <Outlet />
      </div>
     
    </>
  )
}

export default App
