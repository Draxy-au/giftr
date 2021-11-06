import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { login, logout, setUser } from "./redux/user.slice";
import jwt from "jsonwebtoken";

import { Home } from "./Components/Home/Home";
import { NavigationBar } from "./Components/NavBar/NavBar";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { NoMatch } from "./Components/NoMatch/NoMatch";
import { HowItWorks } from "./Components/HowItWorks/HowItWorks";
import { YourList } from "./Components/YourList/YourList";
import { CreateNewList } from "./Components/CreateNewList/CreateNewList";
import { GiftLists } from "./Components/GiftLists/GiftLists";
import { Footer } from "./Components/Footer/Footer";
import { GiftList } from "./Components/GiftLists/GiftList/GiftList";
import { AddGift } from "./Components/AddGift/AddGift";
import { EditGift } from "./Components/AddGift/EditGift";
import { GiftListItemInfo } from "./Components/GiftLists/GiftList/GiftListItemInfo/GiftListItemInfo";

import { useSelector, useDispatch } from "react-redux";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState({});

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  const validToken = (token) => {
    if (token.payload) {
      let exp = new Date(token.payload.exp * 1000);
      let now = new Date();
      if (exp > now) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    let userToken = localStorage.getItem("access-token");
    if (userToken) {
      let decodedToken = jwt.decode(userToken, { complete: true });
      if (validToken(decodedToken)) {
        setToken(decodedToken);
        dispatch(setUser(decodedToken.payload));
        dispatch(login());
      } else {
        localStorage.removeItem("access-token");
        dispatch(logout());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App flex-shrink-0">
        <NavigationBar />
        <div className="lead">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            {loggedIn && (
              <Route exact path="/createnewlist">
                <CreateNewList />
              </Route>
            )}
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact  path="/giftlists">
              <GiftLists />
            </Route>
            {loggedIn && (
              <Route exact path="/yourgiftlist">
                <GiftList name="Xmas List" owner={true} />
              </Route>
            )}
            {loggedIn && (
              <Route exact path="/addgift">
                <AddGift />
              </Route>
            )}
            {loggedIn && (
              <Route exact path="/giftlistitem">
                <GiftListItemInfo />
              </Route>
            )}
            {loggedIn && (
              <Route exact path="/editgift">
                <EditGift />
              </Route>
            )}
            {loggedIn && (
              <Route exact path="/giftlist">
                <GiftList owner={false} />
              </Route>
            )}
            
              <Route exact path="/giftlist/:findid">
                <GiftList owner={false} />
              </Route>
            
            {loggedIn && (
              <Route exact path="/yourlists">
                <YourList />
              </Route>
            )}
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
