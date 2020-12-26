import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/bootstrap.css";
import "./css/jquery.popVideo.css";
import "./css/starability-growRotate.min.css";
import "./css/style.css";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import TinkokoBuyer from "./component/pages/TinkokoBuyer";
import AuthState from "./component/context/authContext/AuthState";
import AlertState from "./component/context/alertContext/AlertState";
import HomeState from "./component/pages/home/HomeState";
import ForgottenPassword from "./component/auth/ForgottenPassword";
import Container from "./component/common/Container";
import Login from "./component/auth/Login";
import SinglePages from "./component/pages/single-pages/SinglePages";
import PostPage from "./component/pages/single-pages/posts/PostPage";
import Register from "./component/auth/Register";
import Home from "./component/pages/home/Home";
import ShoppingCart from "./component/pages/single-pages/checkout/ShoppingCart";
import CheckOutPage from "./component/pages/single-pages/checkout/CheckOutPage";
import ChangePassword from "./component/auth/ChangePassword";
import CompleteOrder from "./component/pages/single-pages/checkout/CompleteOrder";






if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App(props) {
  const [utk, setUtk] = useState(false);
  useEffect(() => {}, []);

  return (
    <AlertState>
      <AuthState>
        <HomeState>
          <Router>
            <Switch>
              {/* <Route path="/" exact component={Home} /> */}

              <Route to="/buyer" exact component={Container} />
              <Route to="/buyer/*" exact component={Container} />
            </Switch>
          </Router>
        </HomeState>
      </AuthState>
    </AlertState>
  );
}

export default App;
