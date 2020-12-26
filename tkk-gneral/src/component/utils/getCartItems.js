const getCartItems = () => {
    let allCookie = document.cookie;
    let cookiesArray = allCookie.split(";");
    let filteredCookies = [];
  
    for (let i = 0; i < cookiesArray.length; i++) {
      if (/s/.test(cookiesArray[i])) {
        cookiesArray[i].trim();
      }
      filteredCookies.push(cookiesArray[i]);
    }
  
    let cart = [];
  
    for (let i = 0; i < filteredCookies.length; i++) {
      if (/cart=/.test(filteredCookies[i])) {
        cart = JSON.parse(filteredCookies[i].split("cart=")[1]);
      }
    }
  
    return {
        noOfItems:cart.length,
        cartItems:cart,
    }
  };
  
  export default getCartItems;