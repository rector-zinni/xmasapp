import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../nav/nav.scss'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import flag from '../../assets/image/flag.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { formatCurrency } from '../../helper/utilities';
import logo from '../../assets/image/logo.png'

export const NavBar = ({ cart_state }) => {
    const navRef = useRef()
    const navigate = useNavigate()
    const toggleNav = () => {
        navRef.current.classList.toggle('show-hide-nav')
    }
    function goto(path) {
        navigate(path)
    }
    return (
        <header className="navbar">
            <h3
                className="nav-logo"
                onClick={() => {
                    navigate('/')
                }}
            >
                <img src={logo} alt="" srcset="" />
                <span>Amazon Fest</span>
            </h3>
            <nav ref={navRef}>
                <NavLink className='n-link' to='/'>Home</NavLink>
                <NavLink className='n-link' to='/'>Shop</NavLink>
                <NavLink className='n-link' to='/cart'>Goto Cart</NavLink>
                <button
                    onClick={toggleNav}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                    />
                </button>
            </nav>

            <ul>
                <li onClick={() => {
                     if(cart_state.totalAmount!==0){
                        goto('/checkout')
                    }else{
                        alert('cart is empty!')
                    }
                }}><img src={flag} alt="" />{formatCurrency(cart_state.totalAmount, '$')}</li>
                <li>
                    <button
                        className="btn-icon"
                        onClick={() => {
                            
                            goto('/cart')
                        }}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
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

