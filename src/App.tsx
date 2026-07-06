import Clock from './components/Clock'
import SessionInput from './components/SessionInput'
import Controls from './components/Controls'
import LogPanel from './components/LogPanel'
import { useState } from 'react'

function App() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [isWorking, setIsWorking] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const handleIn = () => {
    if (isWorking) return

    setIsWorking(true)

    setLogs((prev) => [...prev, `${title} を開始しました`])
  }

  const handleOut = () => {
    if (!isWorking) return

    setIsWorking(false)

    setLogs((prev) => [...prev, `${title} を終了しました`])
  }

  return (
    <main>
      <header>
        <h1>Virtual Study Room</h1>
        <p>今日も、自習室に入ろう。</p>
      </header>

      <Clock />

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
