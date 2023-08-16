import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Feed from './pages/Feed'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login'
import Header from './components/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
			<Router>
				<AuthProvider>
				<Header />
				<Routes>
					<Route path='/login' element= {<Login />} />
					<Route path='/' element= {<Feed/>} />
				</Routes>
				</AuthProvider>
			</Router>
	)
}

export default App
