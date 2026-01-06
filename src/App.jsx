import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import Progress from './pages/Progress'
import StudyMethods from './pages/StudyMethods'

function App() {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'

    return (
        <div>
            <nav className="topnav">
                <Link to="/">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/notes" element={isLoggedIn ? <Notes /> : <Navigate to="/" />} />
                <Route path="/progress" element={isLoggedIn ? <Progress /> : <Navigate to="/" />} />
                <Route path="/study-methods" element={isLoggedIn ? <StudyMethods /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default App
