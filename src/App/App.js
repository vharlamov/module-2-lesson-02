import "bootstrap/dist/css/bootstrap.css"
import NavBar from "./components/navbar"
import Users from "./layouts/users"
import { Route, Switch } from "react-router"
import Login from "./layouts/login"
import MainPage from "./layouts/mainPage"

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" exact component={Users} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  )
}

export default App
