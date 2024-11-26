import React from 'react'
import Card from './Card/Card.js'

const CardList = ({ resturants }) => {
    const CardComponent = resturants.map((user,i) => {
        return <Card key = {i} id = {resturants[i].id} name = {resturants[i].name} type = {resturants[i].type} time = {resturants[i].time} rating = {resturants[i].rating}  ></Card>
    })
    return (
        <div style={{paddingLeft : '2.7rem' , marginTop : "2rem"}}>
           {CardComponent} 
        </div>
    );
}
 
export default CardList