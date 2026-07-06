import Clock from './components/Clock'
import SessionInput from './components/SessionInput'
import Controls from './components/Controls'
import LogPanel from './components/LogPanel'
import { useEffect, useState } from 'react'

export type Session = {
  title: string
  tags: string[]
  start: Date
  end: Date | null
}

export type Log = {
  time: Date
  message: string
}

function App() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const isWorking = session !== null && session.end === null
  const [logs, setLogs] = useState<Log[]>([])
  const [elapsedTime, setElapsedTime] = useState('00:00:00')

  const handleIn = () => {
    if (session) return

    const newSession: Session = {
      title,
      tags: tags
        .split(/\s+/)
        .filter(Boolean)
        .map((tag) => tag.replace(/^#/, '')),
      start: new Date(),
      end: null,
    }
    if (!title.trim()) return

    setSession(newSession)

    setLogs((prev) => [
      ...prev,
      {
        time: newSession.start,
        message: `${newSession.title} を開始しました`,
      },
    ])
  }

  const handleOut = () => {
    if (!session) return

    const end = new Date()

    setSession({
      ...session,
      end,
    })

    setLogs((prev) => [
      ...prev,
      {
        time: end,
        message: `${session.title} を終了しました`,
      },
    ])

    setSession(null)
    setElapsedTime('00:00:00')

  }

  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`
  }

  useEffect(() => {
   const interval = setInterval(() => {
      if (!session) return
      const now = new Date()
      const diff = now.getTime() - session.start.getTime()
      setElapsedTime(formatDuration(diff))
    }, 1000)
    return () => clearInterval(interval)
  }, [session])

  return (
    <main>
      <header>
        <h1>Virtual Study Room</h1>
        <p>今日も、自習室に入ろう。</p>
      </header>

      <Clock />

      <section>
        <h2>経過時間</h2>
        <p>{elapsedTime}</p>
      </section>

      <SessionInput
        title={title}
        tags={tags}
        onTitleChange={setTitle}
        onTagsChange={setTags}
      />

      <Controls
        isWorking={isWorking}
        onIn={handleIn}
        onOut={handleOut}
      />

      <LogPanel logs={logs} />

    </main>
  )
}

export default App
