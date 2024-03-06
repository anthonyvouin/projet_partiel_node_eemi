export const formatPrice = (value)=>{
    if (value) {
        const number = value.toString().split('.');
        if (number.length === 1) {
          return value + '.00';
        } else if (number.length === 2 && number[1].length === 1) {
          return value + '0';
        } else {
          return value.toFixed(2);; 
        }
    }
}
