import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/register'>Register</Link>
				<Link to='/login'>Login</Link>
				<Link to='/Dashboard'>Dashboard</Link>
			</nav>
			<main>
				<Routes>
					<Route element={<Home />} path='/' />
					<Route element={<Register />} path='/register' />
					<Route element={<Login />} path='/login' />
					<Route element={<Dashboard />} path='/dashboard' />
					<Route element={<h1>404</h1>} path='*' />
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
