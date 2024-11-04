import { NavBar } from '../../component/nav/Nav';
import '../../layouts/cart/cart.scss'
import emptycartimg from '../../assets/image/empty-cat-img.svg'
import { NavLink } from 'react-router-dom';
import { Footer } from '../portfolio/Portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import UseViewPort from '../../helper/js/customHook/UseViewPort';
export const Cart = () => {
    return (
        <div className="cart">
            <NavBar />
            <EmptyCart />
            <p className='roboto-thin'>

                The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price. Shopping Cart Learn more

                Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
            </p>
            <CartedProduct/>



            <Footer/>
        </div>
    );
}
export default Cart;


const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <img src={emptycartimg} alt="" />
            <div>
                <p className='roboto-bold'>Your Amazon Cart is eempty</p>
                <NavLink className='empty-cart-link teal roboto-regular'>Shop today's deal</NavLink>
                <div className="flex-group roboto-medium">
                    <button>Checkout with best offer</button>
                    <button>shop now</button>
                </div>
            </div>


        </div>
    );
}

const CartedProduct=()=>{
    const vp = UseViewPort()
    return(
        <div className="carted-product">
            <div className="cart-item-added">
                <div className="cart-item">
                    <img src={(vp>450)?emptycartimg:'https://m.media-amazon.com/images/G/01/cart/empty/animated/rolling-cart-desaturated._CB405694243_.svg'} alt="" />

                    <div>
                        <p><FontAwesomeIcon className='cart-icon-check' icon={faCheckCircle}/> <span>Added to cart</span></p>
                        <p>color: <span>Blue</span></p>
                    </div>
                </div>
            </div>

            <div className="cart-count">
                <div className="cart-subtotal">
                    <span className='roboto-bold'>Cart Subtotal</span>
                    <span>$4000</span>
                </div>


                <div className="cart-count-btn roboto-regular">
                    <button>Proceed to checkout (2 iems)</button>
                    <button>Go to Cart</button>
                </div>

                <p className='roboto-light'>best experience with <span className='teal'>secure payment</span></p>
            </div>

        </div>
    )
}
