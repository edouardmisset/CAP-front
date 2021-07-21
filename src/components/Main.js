import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import FormPage from '../pages/FormPage'
import DashboardPage from '../pages/DashboardPage'

export default function Main() {
  return (
    <main>
      <Switch>
        {/* <Route exact path="/" component={LoginPage} /> */}
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/form" component={FormPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </main>
  )
}
