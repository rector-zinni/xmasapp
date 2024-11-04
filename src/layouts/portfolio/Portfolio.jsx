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


export const PortFolio = () => {
    const [product, setProduct] = useState([])
    const { state } = useCart()
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
            Cookies.set()

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
                <Hero />
                <DiscountBanner />
                <ProductLIst unique_data={unique_data} product_data={product} />
            </div>
            <Footer />
        </div>
    );
}

export const Footer = () => {
    const viewport = UseViewPort()
    return (
        <section className='footer'>
            <img src={(viewport > 450) ? footer : footer_mobile} alt="" />
        </s