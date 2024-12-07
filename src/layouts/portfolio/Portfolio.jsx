import '../portfolio/portfolio.scss'
import DiscountBanner from '../../component/Discount/DiscountBanner';
import { NavBar } from '../../component/nav/Nav';
import { Hero } from '../../component/hero/Hero';
import ProductLIst from '../../component/productList/ProductList';
import { unique_data } from '../../data/mainDb';
import { useEffect, useState } from 'react';
import footer from '../../assets/image/footer.png'
import footer_mobile from '../../assets/image/footer-mobile.png'
import UseViewPort from '../../helper/js/customHook/UseViewPort';
import { useCart } from '../../data/context/CartContext';
import Cookies from 'js-cookie';
import { useRef } from 'react';


export const PortFolio = () => {
    const [product, setProduct] = useState([])
    const { state } = useCart()
    const sectionRef = useRef(null);
    const scrollToSection = () => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start', // Align to the top of the page
          });
        }
      };
    useEffect(() => {
        const productData = async () => {
            const product1 = []
            const res = await fetch('http://localhost:5000/products')
            const data = res.json()
            return data

        }
        productData().then((data) => {
            setProduct(data)
        }).catch(e => {
            console.log(e)
        })
        console.log(product)
    }, []);


    useEffect(() => {
            localStorage.setItem('cart',JSON.stringify(state))
            console.log('this iscart data',Cookies.get('cart'))

    }, [state]);


    return (
        <div className="portfolio">
            <DiscountBanner
                discountString='Sign up to our newsletter and enjoy 20% off your first order'
                color='white'
                bgColor='black'
            />
            <NavBar cart_state={state} />
            <div className='padded-document-section'>
                
            <video loop autoPlay src="https://m.media-amazon.com/images/I/A1PH0yzbVQL.mp4"></video>
                <Hero
                brosweDeal={scrollToSection}
                />
                <Carousel/>
                
                <DiscountBanner />
                <ProductLIst myRef={sectionRef}  unique_data={unique_data} product_data={product} />
            </div>
            <Footer />
        </div>
    );
}

const Carousel = () => {
    // List of images to display in the carousel
    const images = [
      'https://m.media-amazon.com/images/I/71EzVJvRpkL._SX3000_.jpg',
      'https://m.media-amazon.com/images/I/71UVeVmsJfL._SX3000_.jpg',
      'https://m.media-amazon.com/images/I/61AHFMqQlIL._SX1500_.jpg',
      'https://m.media-amazon.com/images/I/71zpBcCjKPL._SX3000_.jpg',
      'https://m.media-amazon.com/images/I/61VZssrzNiL._SX3000_.jpg',
    ];
  
    // State to manage the current image index
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      // Set an interval to change the image every 3 seconds (3000ms)
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className="carousel">
        <img
        src={images[currentIndex]}
        className="visible" alt={`Carousel Image ${currentIndex + 1}`} />
      </div>
    );

}

export const Footer = () => {
    const viewport = UseViewPort()
    return (
        <section className='footer'>
            <img src={(viewport > 450) ? footer : footer_mobile} alt="" />
        </section>
    )
}