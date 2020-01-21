import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Navbar from "./components/common/Navbar";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import SearchBar from './components/common/SearchBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dash/Dashboard";
import DashAdd from "./components/Dash/DashAdd";
import DashIssue from "./components/Dash/DashIssue";
import "./App.css";
import Barcode from "./components/Barcode";
import Landing from "./components/Landing";
import Books from "./components/Books/Books";
import SingleBook from "./components/SingleBook/SingleBook";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashadd" component={DashAdd} />
          <Route exact path="/dashissue" component={DashIssue} />
          <Route exact path="/barcode" component={Barcode} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/singlebook/:id" component={SingleBook} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
