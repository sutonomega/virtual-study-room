type ControlsProps = {
  isWorking: boolean
  onIn: () => void
  onOut: () => void
}

function Controls({
  isWorking,
  onIn,
  onOut,
}: ControlsProps) {
  return (
    <section>
      <h2>操作</h2>

      <div>
        <button
          type="button"
          onClick={onIn}
          disabled={isWorking}
        >
          入室
        </button>

        <button
          type="button"
          onClick={onOut}
          disabled={!isWorking}
        >
          退室
        </button>

        <button type="button" disabled>
          休憩
        </button>
      </div>
    </section>
  )
}

export default Controls
