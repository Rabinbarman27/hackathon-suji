import React, { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function Progress() {
    const [seconds, setSeconds] = useState(0)
    const [points, setPoints] = useState(() => parseInt(localStorage.getItem('points') || '0'))
    const timerRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        drawCombinedChart()
        return () => {
            if (window.progressChart) window.progressChart.destroy()
        }
    }, [])

    function startStudy() {
        if (timerRef.current) return
        timerRef.current = setInterval(() => {
            setSeconds(s => s + 1)
        }, 1000)
    }
    function stopStudy() {
        clearInterval(timerRef.current); timerRef.current = null
    }

    useEffect(() => {
        if (seconds > 0 && seconds % 1800 === 0) {
            setPoints(p => { const np = p + 10; localStorage.setItem('points', np); return np })
        }
    }, [seconds])

    function drawCombinedChart() {
        const ctx = canvasRef.current && canvasRef.current.getContext('2d')
        if (!ctx) return
        const labels = ['No Data']
        const datasets = [{ label: 'Study Time', data: [0], backgroundColor: '#cfd8ff' }]
        if (window.progressChart) window.progressChart.destroy()
        window.progressChart = new Chart(ctx, { type: 'bar', data: { labels, datasets } })
    }

    return (
        <div className="container">
            <h2>Progress</h2>
            <div>Points: <span id="points">{points}</span></div>
            <div id="timer">{new Date(seconds * 1000).toISOString().substr(11, 8)}</div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={startStudy}>Start</button>
                <button onClick={stopStudy}>Stop</button>
            </div>
            <div style={{ height: 300 }}>
                <canvas ref={canvasRef} id="progressChart"></canvas>
            </div>
        </div>
    )
}
