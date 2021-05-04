import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import PrivateRoute from "./PrivateRoute";
import { isLoggedIn } from "./redux";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authUser.authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);

  return (
    <div>
      <Router>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Router>
    </div>
  );
};

export default App;
