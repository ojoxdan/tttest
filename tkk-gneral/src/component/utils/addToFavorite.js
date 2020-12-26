const addToFavorite = (postid, postprice, postTitle, postImage, sellerId=null, sellerPhone=null) => {
  console.log("ok the favorite is here ")
    let allCookie = document.cookie;
    let cookiesArray = allCookie.split(";");
    let filteredCookies = [];
  
    for (let i = 0; i < cookiesArray.length; i++) {
      if (/s/.test(cookiesArray[i])) {
        cookiesArray[i].trim();
      }
      filteredCookies.push(cookiesArray[i]);
    }
  
    let favorites = [];
  
    for (let i = 0; i < filteredCookies.length; i++) {
      if (/favorites=/.test(filteredCookies[i])) {
        favorites = JSON.parse(filteredCookies[i].split("favorites=")[1]);
      }
    }
  
    if (postid && postprice) {
      console.log(" hello the post id and price is now available ");
      if (favorites) {
          let postExist =  false 
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].id === postid) {
              postExist = true
          }
        }
        if (!postExist) {
          favorites = [...favorites, { id: postid, price: postprice, title:postTitle,image: postImage ,seller:sellerId, phone:sellerPhone}];
          favorites = `favorites=${JSON.stringify(favorites)}; expires=${new Date(
            Date.now * 1000
          ).toUTCString()}; path=/`;
          document.cookie = favorites;
        }
      } else {
        favorites = [{ id: postid, price: postprice,title:postTitle, image:postImage }];
        favorites = `favorites=${JSON.stringify(favorites)}; expires=${new Date(
          Date.now * 1000
        ).toUTCString()}; path=/`;
        document.cookie = favorites;
      }
    }
  };
  
  export default addToFavorite;
  