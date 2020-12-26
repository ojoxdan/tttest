import getCartItems from "./getCartItems";

const removeFromCart = (postid) => {
  let allCookie = document.cookie;
  let cookiesArray = allCookie.split(";");
  let filteredCookies = [];
  for (let i = 0; i < cookiesArray.length; i++) {
    if (/s/.test(cookiesArray[i])) {
      cookiesArray[i].trim();
      console.log(cookiesArray[i],"checking")
    }
    filteredCookies.push(cookiesArray[i]);
  }
  console.log(filteredCookies)
  let cart = [];
  
  for (let i = 0; i < filteredCookies.length; i++) {
console.log(i)
    if (/cart=/.test(filteredCookies[i])) {
      cart = JSON.parse(filteredCookies[i].split("cart=")[1]);
    }
  }
  
  let newCart = []
  for (let i = 0; i < cart.length; i++) {
    if (postid.trim() !== cart[i].id.trim()) {
      newCart.push(cart[i])
      console.log(postid.trim(),' this 1')
      console.log(cart[i].id.trim(),' is this 2')
    } else if(postid.trim() !== cart[i].id.trim()){
      console.log(cart[i].id.trim(),' else is the same ')
    }
  }
  console.log(newCart, "greater than new cart")
  document.cookie = `cart=${JSON.stringify(newCart)}; expires=${new Date(
        Date.now * 1000
      ).toUTCString()}; path=/`;
      
    getCartItems()
  };
  
  export default removeFromCart;