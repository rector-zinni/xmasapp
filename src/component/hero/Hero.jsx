import './hero.scss'
import heroTree from '../../assets/image/shade-image.jpeg'
import UseViewPort from '../../helper/js/customHook/UseViewPort';
import { useState } from 'react';
export const Hero = ({brosweDeal}) => {
    const viewport=UseViewPort()
    const [heroImage,setHeroImage]=useState((viewport>450)?heroTree:'')

    return ( 
        <section className="hero">
       <div>
       <div className="cta">
            <h1 className='roboto-bold'>🎉 Holiday Sale - Up to 50% OFF on All Items!"</h1>
            <p>
            Your one-stop shop for perfect gifts and festive deals. Limited time only!
            <br />
            Free shipping on all orders this holiday season! 🎁
            <br />
            Exclusive holiday discounts across all categories – Limited time only!
            </p>
            <button
            onClick={brosweDeal}
            className="btn roboto-bold"> Browser Holiday deal </button>
        </div>

       </div>
        <div className="hero-image">
            <img src={heroImage} alt=""  />
        </div>
        </section>
     );
}