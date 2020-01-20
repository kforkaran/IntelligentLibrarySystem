import React, { Component } from 'react';
import CardList from "../CardList/CardList"

class Books extends Component {
    
    constructor(){
        super();

        this.state = {
            books : []
        }
    }

    componentDidMount(){
        fetch("https://www.googleapis.com/books/v1/volumes?q=introduction to algorithms by clrs&maxResults=20")
        .then((response) => response.json())
        .then(res => this.setState({books : res.items}))
    }


	render() {

        
		return (
			<div>
                <h1 style={{fontFamily: 'Saira Stencil One' , textAlign : 'center', fontSize: '62px' , color: '#0ccac4',background:'to left, rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%'}}>Books</h1>
                <CardList books = {this.state.books}/>
			</div>
		);
	}
}


export default Books;