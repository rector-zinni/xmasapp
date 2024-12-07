export const formatCurrency=(amount,currency)=>{
    let numberString=amount.toString().replace(/\D/g,'')
    let number = Number(numberString)
    return currency+number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCreditCard(cardNumber) {
    // Remove all non-digit characters (like spaces or dashes)
    cardNumber = cardNumber.replace(/\D/g, '');

    // Ensure the card number length is valid (16 digits in most cases)
    

    // Format the number in groups of 4 digits
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
}


export const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    let formattedValue = value.replace(/\D/g, '');

    // Limit the input to 4 digits (MMYY)
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4);
    }

    // Add the slash after the month (MM/YY)
    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2, 4)}`;
    }

    return formattedValue;
  };


  export const formatCvv = (value) => {
    const inputValue = value;

    // Allow only numeric input and limit to 3 or 4 digits
    const formattedValue = inputValue.replace(/\D/g, '').substring(0, 4);  // Maximum 4 digits (for AMEX)
    return (formattedValue);
  };