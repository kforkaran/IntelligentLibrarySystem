import React from 'react';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/Dash/Dashboard';
import './App.css';
import Barcode from './components/Barcode';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Route exact path="/">
        <Grid className="container_parent" direction="column" justify="center" container="true" alignItems="center">
        <Typography className="hero_text" variant="h2" noWrap>
          Andaman College Library
        </Typography>
          <SearchBar />
        </Grid>
      </Route>
      <Route>
        <Dashboard />
        <Barcode />
      </Route>
      </Router>
    </div>
  );
}

export default App;
