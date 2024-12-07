import { NavBar } from '../../component/nav/Nav';
import '../../layouts/cart/cart.scss'
import emptycartimg from '../../assets/image/empty-cat-img.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { Footer } from '../portfolio/Portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import UseViewPort from '../../helper/js/customHook/UseViewPort';
import { useCart } from '../../data/context/CartContext';
import { formatCurrency } from '../../helper/utilities';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import VerifiedShop from '../../component/VerifiedShop/VerifiedShop';

export const Cart = () => {
    const { state,dispatch } = useCart()
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(state))
       

}, [state]);
    const navigate = useNavigate()
    function goto(path) {
        navigate(path)
    }
    const removeCart=(product_name)=>{
        dispatch({type:'REMOVE_ITEM',payload:product_name})
        
    }

       return (
        <div className="cart">
            <NavBar cart_state={state} />
            {(state.items.length === 0) ? <EmptyCart cart={state} /> : <CartedProduct removeCartEvent={(e)=>{
                removeCart(e)
            }} cart={state} />}
          <div className='cart-wrp'>

          {(state.items.length===0)&& <div className="checkout-button-wrapper">
                <button
                onClick={()=>{
                    goto('/')
                }}
                >
                    Cancel
                </button>
                <button>Checkout</button>
            </div>}
            <VerifiedShop/>
            <FreeReturn/>
            <p className='roboto-thin'>

                The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price. Shopping Cart Learn more

                Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
            </p>
          </div>




            <Footer />
        </div>
    );
}
export default Cart;


const EmptyCart = ({ cart }) => {
    const navigate = useNavigate()
    const goto=(path)=> {
        navigate(path)
    }
    return (
        <div className='e-cart'>
            <div className="empty-cart">
                <img src={emptycartimg} alt="" />
                <div>
                    <p className='roboto-bold'>Your Amazon Cart is eempty</p>
                    <NavLink className='empty-cart-link teal roboto-regular' to='/'>Shop today's deal</NavLink>
                    <div className="flex-group roboto-medium">
                        <button  onClick={()=>{
                            goto('/checkout')
                        }}>Checkout with best offer</button>
                        <button onClick={()=>{
                            goto('/')
                        }}>shop now</button>
                    </div>
                </div>



            </div>
            <CartCount cart_amount={cart.totalAmount} cart_length={cart.items.length} />

        </div>
    );
}

const CartedProduct = ({ cart,removeCartEvent }) => {
    const vp = UseViewPort()
  
   
    return (
        <div className="carted-product">

            <div className="cart-item-added">
                <p className="cart-title roboto-medium">Cart</p>
                {cart.items.map((c_data) => (
                    <div className="cart-item">
                        <div>
                            <img src={(vp > 450) ? c_data.image : 'https://m.media-amazon.com/images/G/01/cart/empty/animated/rolling-cart-desaturated._CB405694243_.svg'} alt="" />
                        </div>


                        <div>
                            <div className='wrp'>
                            <p><span className='cart-product-name '>{c_data.name}</span>  </p>
                            <p>price: <span>{formatCurrency(c_data.price, '$')}</span></p>
                            <p><FontAwesomeIcon className='cart-icon-check' icon={faCheckCircle} /> <span>free shipping</span></p>
                            </div>
                            
                            <span className='close-icon' 
                            onClick={()=>{
                                removeCartEvent(c_data)
                            }}
                            
                            ><FontAwesomeIcon  className='' icon={faTrash}
                             />
                             </span>
                        </div>
                      
                    </div>
                ))}
            </div>
            <CartCount cart_amount={cart.totalAmount} cart_length={cart.items.length} />


        </div>
    )
}


const CartCount = ({ cart_amount, cart_length,go_to }) => {
    const navigate = useNavigate()
    const goto=(path)=> {
        navigate(path)
    }
    return (
        <div className="cart-count">
            <div className="cart-subtotal">
                <span className='roboto-bold'>Cart Subtotal</span>
                <span>{formatCurrency(cart_amount, '$')}</span>
            </div>


            <div className="cart-count-btn roboto-regular">
                <button  onClick={()=>{
                            goto('/checkout')
                        }}>Proceed to checkout ({cart_length} items)</button>
                <button
               onClick={()=>{goto('/')}}
                >Shop</button>
            </div>

            <p className='roboto-light'>best experience with <span className='teal'>secure payment</span></p>
        </div>
    )
}


const FreeReturn=()=>{

    return(
        <div className="free-return">
            <p className='roboto-normal'>Free Returns</p>
            <span> Easy returns on eligible items within 30 days. </span>
        </div>
    )
}