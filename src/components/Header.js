import NavBar from './NavBar'
import logo from '../assets/images/logo1-black.png'

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">Climb harder</h1>
      <q>There’s no such thing as too much power!</q>
      <span className="author">
        ~ W. Güllich
        <span ariaLabel="strong" role="img">
          💪
        </span>
      </span>
      <NavBar />
    </header>
  )
}
