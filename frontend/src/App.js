import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/common/Navbar";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import SearchBar from './components/common/SearchBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dash/Dashboard";
import DashAdd from "./components/Dash/DashAdd";
import AddCardList from "./components/CardList/AddCardList";
import DashIssue from "./components/Dash/DashIssue";
import "./App.css";
import Barcode from "./components/Barcode";
import Landing from "./components/Landing";
import Books from "./components/Books/Books";
import SearchForDB from "./components/SearchForDB";
import SingleBook from "./components/SingleBook/SingleBook";
import Test from "./components/Test";
import setAuthToken from "./utils/setAuthToken";


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashadd" component={DashAdd} />
          <Route exact path="/dashadd2" component={AddCardList} />
          <Route exact path="/dashissue" component={DashIssue} />
          <Route exact path="/barcode" component={Barcode} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/singlebook/:id" component={SingleBook} />
          <Route exact path="/barcode-scanner" component={Test} />
          <Route exact path="/searchdb" component={SearchForDB} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
  