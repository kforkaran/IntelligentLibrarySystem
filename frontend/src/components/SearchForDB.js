import React from "react";
import { Grid, Typography } from "@material-ui/core";
import SearchBar from "./common/SearchBar";

export default function SearchForDB() {
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
        <Typography variant="h5" noWrap>Search in Database</Typography>
      </Typography>
      <SearchBar />
    </Grid>
  );
}
