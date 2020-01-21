import React, { Component } from 'react';
import CardList from "../CardList/CardList"
import queryString from "query-string";
import Typography from '@material-ui/core/Typography';

class Books extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            books : []
        }
    }

    componentDidMount(){
        const searchParams = queryString.parse(this.props.location.search);
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchParams.q + "&maxResults=20")
        .then((response) => response.json())
        .then(res => this.setState({books : res.items}))
    }


	render() {

        
		return (
			<div>
                {/* <h1 style={{fontFamily: 'Saira Stencil Olor: '#0ccac4',
                background:'to left, rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%'}}>Books</h1>ne' , textAlign : 'center', fontSize: '62px' , color: '#0ccac4',
                background:'to left, rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%'}}>Books</h1> */}
                <Typography variant="h2" align="center" style={{margin:'2rem 0 2rem 0'}}>View Books</Typography>
                <CardList books = {this.state.books}/>
			</div>
		);
	}
}


export default Books;