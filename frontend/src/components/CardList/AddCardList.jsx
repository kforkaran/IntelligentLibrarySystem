import React, { Component } from "react";
import "./card-list.css";
import MeraCard from "../Card/MeraCard";
import queryString from "query-string";

class AddCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        searchParams.q +
        "&maxResults=20"
    )
      .then(response => response.json())
      .then(res => this.setState({ books: res.items }));
  }

  render() {
    const cards = [];
    const books = this.state.books;
    for (let i in books) {
      cards.push(
        <MeraCard
          key={books[i].id}
          id={books[i].id}
          book={books[i].volumeInfo}
        />
      );
    }

    return <div className="card-list">{cards}</div>;
  }
}

export default AddCardList;
