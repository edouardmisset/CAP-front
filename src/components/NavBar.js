import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <ul className="nav-items">
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/form">
            Add Ascent
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}
