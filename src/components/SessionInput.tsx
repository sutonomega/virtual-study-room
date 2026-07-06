type SessionInputProps = {
  title: string
  tags: string
  onTitleChange: (value: string) => void
  onTagsChange: (value: string) => void
}

function SessionInput({
      title,
      tags,
      onTitleChange,
      onTagsChange,
    }: SessionInputProps) {
  return (
    <section>
      <h2>セッション</h2>

      <div>
        <label htmlFor="title">作業名</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="例: AI開発"
        />
      </div>

      <div>
        <label htmlFor="tags">タグ</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="#AI #開発"
        />
      </div>
    </section>
  )
}

export default SessionInput
