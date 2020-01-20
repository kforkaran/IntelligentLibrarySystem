import React, { Component } from 'react';
import CardList from "../CardList/CardList"

class SingleBook extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            bookinfo : {
                title : "",
                authors : [],
                publisher : "",
                publishedDate : "",
                description : "",
                categories : [],
                imageLinks : []
            }
        }
    }

    componentDidMount(){
        fetch("https://www.googleapis.com/books/v1/volumes/" + this.state.id)
        .then((response) => response.json())
        .then(res => {
            const book = res.volumeInfo;
            this.setState({
            bookinfo : {
                title : book.title,
                authors : book.authors,
                publisher : book.publisher,
                publishedDate : book.publishedDate,
                description : book.description,
                categories : book.categories,
                imageLinks : book.imageLinks.smallThumbnail
            }
        })})
    }

1
	render() {

        
		return (
			<div>
                {console.log(this.state.bookinfo)}
                <h1 style={{fontFamily: 'Saira Stencil One' , textAlign : 'center', fontSize: '62px' , color: '#0ccac4',background:'to left, rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%'}}>{this.state.bookinfo.title}</h1>
                <h3>{this.state.bookinfo.authors}</h3>
                <img alt={`${this.state.bookinfo.title}`} src={`${(this.state.bookinfo.imageLinks ) || null}`}></img>
                <h3>categories : {this.state.bookinfo.categories}</h3>
                <p>{this.state.bookinfo.description}</p>
                <h4>Published by:{this.state.bookinfo.publisher} {this.state.bookinfo.publishedDate} </h4>

			</div>
		);
	}
}


export default SingleBook;