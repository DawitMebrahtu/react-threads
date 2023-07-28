import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Feed from './pages/Feed'

function App() {
  const [count, setCount] = useState(0)

  return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element= {<Feed/>} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
