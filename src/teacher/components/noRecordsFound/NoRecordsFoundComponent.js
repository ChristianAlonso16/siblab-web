import image from './searching.jpg';
import React from 'react';
import './notFound.css';

export const NoRecordsFound = ({text}) => {
    return (
        <div className="no-records">
            <img className='imag' src={image} alt="No records found" />
            <p>{text ? text : "We're sorry, but no records were found matching your search criteria."}</p>
        </div>
    );
}