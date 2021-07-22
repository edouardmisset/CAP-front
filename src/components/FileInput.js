const noop = (file) => {
  window.console.log(`Hello file: ${file}`)
}

const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {!!value.length && (
      <div>Selected files: {value.map((f) => f.name).join(', ')}</div>
    )}
    <label id="file-input-label" className="btn" htmlFor="file-input">
      Or click to select a file...
      <input
        {...rest}
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

export default FileInput
