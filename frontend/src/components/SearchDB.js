import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core';
import UserSearchBar from "./common/UserSearchBar";

export default function Landing() {
  return (
      <Grid
        className="container_parent"
        direction="column"
        justify="center"
        container="true"
        alignItems="center"
      >
        <Typography className="hero_text" variant="h2" noWrap>
          Andaman College Library
        </Typography>
        <Divider />
        <Typography style={{paddingTop:'1rem'}} align="middle" variant="h5" noWrap>
          Search In College Library Database
        </Typography>
        <UserSearchBar />
      </Grid>
  );
}
