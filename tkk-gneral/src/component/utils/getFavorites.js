const getFavorites = () => {
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
  
    return {
        noOfItems:favorites.length,
        favoritesItems:favorites,
    }
  };
  
  export default getFavorites;