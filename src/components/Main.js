import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'

export default function Main() {
  return (
    <main>
      <Switch>
        {/* <Route exact path="/" component={LoginPage} /> */}
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </main>
  )
}
