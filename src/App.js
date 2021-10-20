import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import NavigationBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NoMatch from "./Components/NoMatch/NoMatch";
import { YourList } from "./Components/YourList/YourList";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import { CreateNewList } from "./Components/CreateNewList/CreateNewList";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/createnewlist">
            <CreateNewList />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/giftlists">
            TODO: GIFT LISTS
          </Route>
          <Route path="/yourlists">
            <YourList />
          </Route>
          <Route path="/howitworks">
            <HowItWorks />
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
