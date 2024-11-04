import '../Discount/discount-banner.scss'
const DiscountBanner = ({discountString,color,bgColor}) => {
    return ( 
        <div 
        className="discount-banner"
        style={{
            backgroundColor:bgColor,
            color:color,
            border:'1px solid '+color
        }}
        >
            <span>
                {discountString}
            </span>

        </div>
     );
}
 
export default DiscountBanner;