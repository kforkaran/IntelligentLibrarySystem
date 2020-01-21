import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    boxShadow: "0 1px 4px -1px #000",
    "&:hover": {
      boxShadow: "0 1px 4px 0px #000"
    }
  },
  media: {
    height: "250px",
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const addToDB = async (id, history) => {
  console.log(id);
  const bookData = {
    id,
    noOfCopies: 10
  }
  await axios.post("http://localhost:8000/api/admin/addBook", bookData);
  console.log("book added");
  history.push("/dashboard");
}

function MeraCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props.book);

  return (
    <Card className={classes.card} style={{minWidth:'300px'}}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        // {/* <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} /> */}
        //   </IconButton>
        // }
        title={props.book.title}
        subheader={props.book.authors}
      />
      <Paper variant="outlined" style={{padding:'8px 12px',margin:'3px 5px 6px 5px', backgroundColor:'wheat'}}>Genre:   {props.book.categories}</Paper>
      <CardMedia
        className={classes.media}
        image={`${(props.book.imageLinks && props.book.imageLinks.thumbnail) ||
          null}`}
        title={props.book.title}
      />
      <CardActions disableSpacing>
        <Button  style={{padding:'8px 12px',margin:'3px 5px 6px 5px', backgroundColor:'wheat'}} onClick={() => addToDB(props.id)}>Add this book</Button>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}

export default withRouter(MeraCard);