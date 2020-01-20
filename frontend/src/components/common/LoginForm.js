import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Face, Fingerprint } from '@material-ui/icons'

import {loginUser} from "../../actions/authActions";
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: ""
      }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
      e.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.loginUser(userData);
    //   this.props.history.push('/dashboard');
    }

    render() {
        const { classes } = this.props;
        return (
          <Paper className={classes.padding}>
            <div className={classes.margin}>
              <Grid container spacing={4} alignItems="flex-end">
                <Grid item>
                  <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="username"
                    label="Username"
                    type="email"
                    onChange={this.onChange}
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="flex-end">
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="username"
                    label="Password"
                    type="password"
                    onChange={this.onChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Button
                    disableFocusRipple
                    disableRipple
                    style={{ textTransform: "none" }}
                    variant="text"
                    color="primary"
                  >
                    Forgot password ?
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: "10px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={this.onSubmit}
                >
                  Login
                </Button>
              </Grid>
            </div>
          </Paper>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {loginUser})
)(LoginForm);