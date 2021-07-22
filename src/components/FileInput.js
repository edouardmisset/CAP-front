const noop = () => {
  console.log('hello file')
}

const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {!!value.length && (
      <div>Selected files: {value.map((f) => f.name).join(', ')}</div>
    )}
    <label htmlFor="file-input">
      Click to select some files...
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
