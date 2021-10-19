import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import NavigationBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NoMatch from "./Components/NoMatch/NoMatch";
import { Jumbo } from "./Components/Jumbo/Jumbo";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Jumbo />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/giftlists">
            TODO: GIFT LISTS
          </Route>
          <Route path="/yourlists">
            TODO: YOUR LISTS
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
