import react from 'react'

const Scroll =(props) =>{
    return(
        <div style={{overflow : 'scroll' ,padding : '5px' , height : '800px' , paddingLeft : '2rem' , paddingTop : '2rem'}}>
        {props.children}
        </div>
    );
}

export default Scroll