import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Pop from "./Pop";
import Typography from "@material-ui/core/Typography";
// import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
// import SearchIcon from '@material-ui/icons/Search';
// import MicIcon from '@material-ui/icons/Mic';
// import SearchBar from './SearchBar';

import { logoutUser } from "../../actions/authActions";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

const onLogout = logoutUser => {
  console.log("logout");
  logoutUser();
}

const Navbar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Andaman College Library
          </Typography>
          {props.auth.isAuthenticated ? (
            <Button variant="contained" color="primary" onClick={() => onLogout(props.logoutUser)}>
              Logout
            </Button>
          ) : (
            <Pop>Login</Pop>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
