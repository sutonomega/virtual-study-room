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
  const [sessions, setSessions] = useState<Session[]>([])
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

    const finishedSession = {
      ...session,
      end,
    }

    const nextSessions = [...sessions, finishedSession]

    setSessions(nextSessions)

    const markdown = generateMarkdown(nextSessions)
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${new Date().toISOString().slice(0, 10)}.md`
    a.click()

    URL.revokeObjectURL(url)

    setSession(null)
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

  const generateMarkdown = (sessions: Session[]) => {
    const date = new Date().toISOString().slice(0, 10)

    const tags = Array.from(
      new Set(sessions.flatMap((s) => s.tags))
    )

    const body = sessions
      .map((s) => {
        const duration = s.end
          ? Math.floor((s.end.getTime() - s.start.getTime()) / 1000 / 60)
          : 0

        return `## ${s.title}

start: ${s.start.toISOString()}
end: ${s.end?.toISOString()}
duration_minutes: ${duration}`
    })
    .join('\n\n---\n\n')

    return `---
title: ${date}
tags: [${tags.join(', ')}]
---

${body}
`
  }

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
