import './hero.scss'
import heroTree from '../../assets/image/shade-image.jpeg'
import UseViewPort from '../../helper/js/customHook/UseViewPort';
import { useState } from 'react';
export const Hero = () => {
    const viewport=UseViewPort()
    const [heroImage,setHeroImage]=useState((viewport>450)?heroTree:'')

    return ( 
        <section className="hero">
       <div>
       <div className="cta">
            <h1 className='roboto-bold'>Xmas is here again!</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quas vitae est ipsa neque facilis labore vero praesentium sunt, accusamus ab saepe nostrum, facere ex qui tempora fuga laudantium officiis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quas vitae est ipsa neque facilis labore vero praesentium sunt, accusamus ab saepe nostrum, facere ex qui tempora fuga laudantium officiis?
            </p>
            <button className="btn roboto-bold"> Call to Action </button>
        </div>

       </div>
        <div className="hero-image">
            <img src={heroImage} alt=""  />
        </div>
        </section>
     );
}