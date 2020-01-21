import React from 'react';
import './card-list.css';
import MeraCard from '../Card/MeraCard';

const CardList = (props) =>{
    return(
        <div className="card-list">
            {props.books.map(book => (
                <MeraCard key={book.id} id={book.id} book={book.volumeInfo} />
            ))}
        </div>
    )
}

export default CardList;