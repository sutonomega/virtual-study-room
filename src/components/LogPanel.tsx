type LogPanelProps = {
  logs: string[]
}

function LogPanel({ logs }: LogPanelProps) {
  return (
    <section>
      <h2>ログ</h2>

      {logs.length === 0 ? (
        <p>待機中</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LogPanel
