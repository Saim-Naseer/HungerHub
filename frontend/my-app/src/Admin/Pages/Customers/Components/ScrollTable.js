import react from 'react'

const ScrollTable =(props) =>{
    return(
        <div style={{overflow : 'scroll' , height : 'auto' , paddingLeft : '2rem' , paddingTop : '2rem'}}>
        {props.children}
        </div>
    );
}

export default ScrollTable