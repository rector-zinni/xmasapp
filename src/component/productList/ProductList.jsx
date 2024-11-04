import cgJpg from '../../assets/image/unique product/christmas gift.jpg'
import coJpg from '../../assets/image/unique product/christmas ornament.jpg'
import hoJpg from '../../assets/image/unique product/hanging ornament.jpg'
import kitJpg from '../../assets/image/unique product/kitchen.jpg'
import stoJpg from '../../assets/image/unique product/stockings.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../productList/product-list.scss'
import { faCheckCircle, faCheckSquare, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../data/context/CartContext'


const ProductLIst = ({ unique_data, product_data }) => {
    
  
       
    return (
        <div className="product-list">
             <h3>Shop unique Handmade items</h3>
            <div className="unique-product-grid">
               
                {unique_data.map((data) => (

                    <UniqueProduct key={data.name} category={data.name} image={data.image} />

                ))}
            </div>
            <h3>Christmas is here! Shop with us</h3>
          {(product_data.length==0)?<PageLoader/>:<Myproduct product_data={product_data}/>}

        </div>
    );
}


const Product = ({ product,name, price, image, href,supplier}) => {
    const {state,dispatch}=useCart()

    const randomSales=()=>{
        const random_number=Math.floor(Math.random()*(1000-200+1))+200
        return random_number
    }


     const removeDotFromPrice=(price)=>{
        const stringValue=parseInt(price.replace(',','').replace(/\.$/,''))
        return stringValue
    }

    const addCart=()=>{
        const formattedPrice=removeDotFromPrice(price)
        const cart_data={
            name:name,
            price:formattedPrice,
            image:image,
            href:href,
            supplier:supplier
        }
        const data=[]

        data.push(cart_data)
        const cartProduct_data={
            items:cart_data,
            totalAmount:0
        }
        dispatch({type:'ADD_ITEM',payload:cart_data})
        console.log(state)
    }
    return (
        <div className="product">
           <div className="product-image">
           <img src={image} alt=''/>
           </div>
          <div>
          <p className="supplier roboto-bold">{supplier}</p>
           <p className="product-name roboto-medium" >{name}</p>
           <Stars num={5} starIcon={faStar} color='goldenrod'/>
           <span className='sales-count'>+{randomSales()} sold in past month</span>
            <div className="product-price roboto-normal">
              <p>
                <sup>$</sup>
                <span>{price}</span>
                <sup>99</sup>
              </p>
            </div>

            <div className="free-delivery">
                <span>
                    Free Delivery
                </span>
                <span>:</span>

                <Stars num={5} starIcon={faCheckCircle} color='rgb(69, 136, 217)'/>
                

            </div>
            <span>of items shipped by <b>Amazon</b></span>
            <button className='add-to-cart-btn roboto-regular ' onClick={addCart}>Add to cart</button>
          </div>
        </div>
    );
}


export const UniqueProduct = ({ category, image }) => {
    return (
        <div className="unique-product">
            <img src={image} alt="" />
            <span className='roboto-normal'>{category}</span>
        </div>
    );
}


const Stars=({num,starIcon,color})=>{
    return(
    <ul className="stars-parent">
    {([...Array(num)]).map((data)=>(
        <li 
        style={{
            color:color
        }}
        >
            <FontAwesomeIcon icon={starIcon}/>
        </li>     

        
    ))}
    </ul>
    )
}



const PageLoader = () => {
    return (
        <div className="loader">
            Loading...
            <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    );
};

const Myproduct= ({product_data})=>{
    return(
        <div className="product-list-grid">{
    product_data.map((data)=>(
        <Product supplier='Amazon prime' key={data.name} name={data.name} price={data.price} image={data.image} href={data.href} />
    ))}
    </div>
    )
}
export default ProductLIst;