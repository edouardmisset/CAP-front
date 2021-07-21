import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import FormPage from '../pages/FormPage'

export default function Main() {
  return (
    <main>
      <Switch>
        {/* <Route exact path="/" component={LoginPage} /> */}
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/form" component={FormPage} />
      </Switch>
    </main>
  )
}
