import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()

    function createAccount() {
        if (!name || !email || !password) { alert('Please fill all fields'); return }
        const user = { name, email, password }
        localStorage.setItem('studentUser', JSON.stringify(user))
        alert('Account created successfully!')
        nav('/')
    }

    return (
        <div className="container">
            <h2>Create Account</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={createAccount}>Create Account</button>
            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    )
}
