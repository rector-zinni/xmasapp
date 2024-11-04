import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../nav/nav.scss'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import flag from '../../assets/image/flag.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

export const NavBar = ({cart_state}) => {
    const navRef=useRef()
    const toggleNav=()=>{
        navRef.current.classList.toggle('show-hide-nav')
    }
    
    return (  
        <header className="navbar">
            <h3 className="nav-logo">
                <img src="" alt="" srcset="" />
                <span>LOGO</span>
            </h3>
            <nav ref={navRef}>
            <NavLink className='n-link'>Home</NavLink>
            <NavLink className='n-link'>Home</NavLink>
            <NavLink className='n-link'>Home</NavLink>
            <button
            onClick={toggleNav}
            >
                <FontAwesomeIcon
                 icon={faTimes}
                 />
            </button>
            </nav>

            <ul>
                <li><img src={flag} alt="" />EN</li>
                <li>
                <button className="btn-icon">
                <FontAwesomeIcon icon={faCartShopping}/>
                <span>{cart_state.items.length}</span>
                </button>
                </li>
                {/* <li>
                <button className="btn">Account</button>
                </li> */}
            </ul>
           <div className="bars">
           <button
            className='btn'
            onClick={toggleNav}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
           </div>
        </header>
    );
}

