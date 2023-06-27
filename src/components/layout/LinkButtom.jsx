import './LinkButtom.modules.css'

function LinkButtom ({to, text}){
    return(
        <a href={to} className='btn'>{text}</a>
    )
}

export default LinkButtom