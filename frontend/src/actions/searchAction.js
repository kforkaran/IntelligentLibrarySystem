exports.setBooks = books => dispatch => {
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookInput + "&maxResults=20")
  .then(res => {
    res.json();
  })
  .then(res => {
    console.log("Books**********************")
    console.log(res)
    dispatch({
      type: "SET_BOOKS",
      payload: res
    });
    history.push("/books");
  })
  .catch(err => {
    console.log(err);
  })

};
