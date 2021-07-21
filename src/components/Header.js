import NavBar from './NavBar'
import logo from '../assets/images/logo1-black.png'

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">Climbing is fun!</h1>
      <NavBar />
    </header>
  )
}
