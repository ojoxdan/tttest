import getCartItems from "./getCartItems";

const removeFromCart = (postid) => {
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
  console.log(cart, "this is the reove cart id")
  
  for (let i = 0; i < filteredCookies.length; i++) {
    if (/cart=/.test(filteredCookies[i])) {
      
      cart = JSON.parse(filteredCookies[i].split("cart=")[1]);
    }
  }
  
  let newCart = []
  for (let i = 0; i < cart.length; i++) {
    if (postid !== cart[i].id.trim()) {
      newCart.push(cart[i])
    } else{
      console.log(postid,' this is the drop down id')
    }
  }
    document.cookie = `cart=${JSON.stringify(newCart)}; expires=${new Date(
        Date.now * 1000
      ).toUTCString()}; path=/`;
      
    getCartItems()
  };
  
  export default removeFromCart;