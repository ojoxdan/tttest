const addToCard = (postid, postprice, postTitle, postImage) => {
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

  if (postid && postprice) {
    console.log(" hello the post id and price is now available ");
    if (cart) {
        let postExist =  false 
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === postid) {
            postExist = true
        }
      }
      if (!postExist) {
        cart = [...cart, { id: postid, price: postprice, title:postTitle,image: postImage }];
        cart = `cart=${JSON.stringify(cart)}; expires=${new Date(
          Date.now * 1000
        ).toUTCString()}; path=/`;
        document.cookie = cart;
      }
    } else {
      cart = [{ id: postid, price: postprice,title:postTitle, image:postImage }];
      cart = `cart=${JSON.stringify(cart)}; expires=${new Date(
        Date.now * 1000
      ).toUTCString()}; path=/`;
      document.cookie = cart;
    }
  }
};

export default addToCard;
