import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const nav = useNavigate()

    function logout() {
        localStorage.clear();
        nav('/')
    }

    return (
        <div className="container">
            <aside style={{ float: 'left', width: 220, marginRight: 16 }}>
                <h2>🎓 StudyHub</h2>
                <ul>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/study-methods">Study Methods</a></li>
                    <li><a href="/notes">Daily Plan</a></li>
                    <li><a href="/progress">Progress</a></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </aside>
            <main style={{ overflow: 'hidden' }}>
                <header>
                    <h1>Welcome, Student 👋</h1>
                    <p>Smart studying leads to success</p>
                </header>

                <section>
                    <h2>📘 Effective Study Methods</h2>
                    <p>Open the Study Methods page to learn techniques.</p>
                </section>
            </main>
        </div>
    )
}
