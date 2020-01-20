import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import SearchBar from "./common/SearchBar";

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
        <SearchBar />
      </Grid>
  );
}
