import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()

    function onSubmit(e) {
        e.preventDefault()
        const saved = JSON.parse(localStorage.getItem('studentUser'))
        if (!saved) { alert('No account found. Please create one.'); return }
        if (email === saved.email && password === saved.password) {
            localStorage.setItem('isLoggedIn', 'true')
            nav('/dashboard')
        } else {
            alert('Invalid email or password')
        }
    }

    function socialLogin(provider) {
        alert(provider.toUpperCase() + ' login coming soon')
        localStorage.setItem('isLoggedIn', 'true')
        nav('/dashboard')
    }

    return (
        <div className="container">
            <h2>Welcome Back 🎓</h2>
            <p className="subtitle">Student Login</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button onClick={() => socialLogin('google')}>Google</button>
                <button onClick={() => socialLogin('twitter')}>Twitter</button>
            </div>

            <div className="or">OR</div>

            <form onSubmit={onSubmit} id="loginForm">
                <input type="email" placeholder="Student Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>

            <p className="signup-text">Don’t have an account? <a href="/signup">Create one</a></p>
        </div>
    )
}
