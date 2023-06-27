import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import './Footer.modules.css'

function Footer () {
    return (
        <footer className='footer'>
        <ul className='social_list'>
            <li><FaFacebook /></li>
            <li><FaInstagram /></li>
            <li><FaLinkedin /></li>
        </ul>
        </footer>
    )
}

export default Footer