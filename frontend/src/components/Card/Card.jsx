import React,{Component} from 'react';
import './card.css';
import { Link } from 'react-router-dom';

class Card extends Component{
    render(){
        return(
            <div className='card-container'>
                <Link to={"/singlebook/"+ this.props.id} >
                    <img alt={`${this.props.book.title}`} src={`${(this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail) || null}`}></img>
                    <h2 >{this.props.book.title}</h2>
                    <p>Category : {this.props.book.categories}</p>
                    <p></p>
                    <p>{this.props.book.authors}</p>
                </Link>
            </div>
        )
    }
}

export default Card;