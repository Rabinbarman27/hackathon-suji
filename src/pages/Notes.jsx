import React, { useEffect, useState } from 'react'

export default function Notes() {
    const [subject, setSubject] = useState('')
    const [notes, setNotes] = useState('')
    const [saved, setSaved] = useState([])

    useEffect(() => {
        const el = setInterval(() => {
            const cl = document.getElementById('clock')
            if (cl) cl.innerText = new Date().toLocaleTimeString()
        }, 1000)
        return () => clearInterval(el)
    }, [])

    function saveNotes() {
        if (!subject || !notes) { alert('Please fill both fields'); return }
        const next = [...saved, { subject, notes }]
        setSaved(next)
        setSubject(''); setNotes('')
    }

    return (
        <div className="container">
            <h1>Daily Study Planner</h1>
            <p className="subtitle">Plan • Write • Review</p>

            <label>Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Eg: Java, DBMS" />

            <label>Today's Plan / Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="What will you study today?"></textarea>

            <button onClick={saveNotes}>Save Notes</button>

            <h2>Saved Plans</h2>
            <div id="savedNotes">
                {saved.map((s, i) => (<div key={i} className="note"><strong>{s.subject}</strong><br />{s.notes}</div>))}
            </div>

            <aside style={{ marginTop: 16 }}>
                <div className="box"><h3>🕒 Time</h3><div id="clock" className="clock">00:00:00</div></div>
            </aside>
        </div>
    )
}
