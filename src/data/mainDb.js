import cgJpg from '../assets/image/unique product/christmas gift.jpg'
import coJpg from '../assets/image/unique product/christmas ornament.jpg'
import hoJpg from '../assets/image/unique product/hanging ornament.jpg'
import kitJpg from '../assets/image/unique product/kitchen.jpg'
import stoJpg from '../assets/image/unique product/stockings.jpg'
export const unique_data=[
    {
        name:'Christmas Ornament',
        image:coJpg
    },
    {
        name:'Christmas Gift',
        image:cgJpg
    },
    {
        name:'Hanging Ornament',
        image:hoJpg
    },
    {
        name:'Kitchen',
        image:kitJpg
    },
    {
        name:'Stokings',
        image:stoJpg
    }
]

export const productData=()=>{
    const product =[]
    fetch('http://localhost:5000/products').then((res)=>{
        return res.json
    }).then((data)=>{
        product.push(data)
    }).catch((e)=>{
        console.error('There was a problem with the fetch operation',e)

    })
    return product

}