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
import { GiftLists } from "./Components/GiftLists/GiftLists";
import { Footer } from "./Components/Footer/Footer";
import { GiftList } from "./Components/GiftLists/GiftList/GiftList";

function App() {
  return (
    <Router>
      <div className="App flex-shrink-0">
        <NavigationBar />
        <div className="lead">
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
            <GiftLists />
          </Route>
          <Route path="/yourgiftlist">
            <GiftList name="Xmas List" owner={true} />
          </Route>
          <Route path="/giftlist">
            <GiftList name="Emma's Xmas List" owner={false} />
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
        <footer className="fixFooter">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
