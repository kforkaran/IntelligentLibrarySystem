import React from 'react';
import './card-list.css';
import Card from '../Card/Card';

const CardList = (props) =>{
    return(
        <div className="card-list">
            {props.books.map(book => (
                <Card key={book.id} id={book.id} book={book.volumeInfo} />
            ))}
        </div>
    )
}

export default CardList;