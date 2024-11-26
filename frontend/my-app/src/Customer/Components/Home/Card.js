import React from 'react'
import "./Card.css"

const Card = ({name,cusine}) => {
    return(
        <>
            <div className='c_card'>
                <div className='c_image'></div>
                <p className='c_name'>{name}</p>
                <p className='c_cuisine'>{cusine}</p>
            </div>
        </>
    )
}


export default Card
