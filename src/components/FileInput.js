export default function FileInput({ value, onChange, ...rest }) {
  return (
    <div>
      {!!value.length && (
        <div>
          Selected files:
          {value.map((file) => file.name).join(', ')}
        </div>
      )}
      <label
        id="file-input-label"
        className="btn"
        htmlFor="file-input"
        {...rest}
      >
        Click to add a CSV...
        <input
          style={{ display: 'none' }}
          type="file"
          id="file-input"
          onChange={(e) => {
            onChange([...e.target.files])
          }}
        />
      </label>
    </div>
  )
}
