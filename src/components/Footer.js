/* eslint-disable react/jsx-one-expression-per-line */
export default function Footer() {
  return (
    <footer>
      <p>
        Made in Lyon{' '}
        <span
          style={{ display: 'inline-block' }}
          aria-label="France"
          role="img"
        >
          🇫🇷
        </span>{' '}
        using my{' '}
        <span style={{ display: 'inline-block' }} role="img" aria-label="paws">
          🐾
        </span>{' '}
        and{' '}
        <span style={{ display: 'inline-block' }} role="img" aria-label="beer">
          🍺
        </span>
      </p>
    </footer>
  )
}
