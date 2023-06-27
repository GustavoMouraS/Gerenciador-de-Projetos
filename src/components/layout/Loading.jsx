import './Loading.modules.css'
import Load from '../../assets/Loading.svg'

function Loading () {
    return (
        <div className='loader_container'>
            <img className='loader' src={Load} alt="Loading" />
        </div>
    )
}

export default Loading