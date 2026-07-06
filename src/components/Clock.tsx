import { useEffect, useState } from 'react'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const time = currentTime.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <section>
      <h2>時計</h2>
      <p>{time}</p>
    </section>
  )
}

export default Clock
