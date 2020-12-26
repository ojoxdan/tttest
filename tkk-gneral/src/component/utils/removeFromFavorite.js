import getFavorites from "./getFavorites";

const removeFromFavorite = (postid) => {
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
  
  let newfavorites = []
  for (let i = 0; i < favorites.length; i++) {
    if (postid !== favorites[i].id.trim()) {
      newfavorites.push(favorites[i])
    } else{
      console.log(postid,' this is the drop down id')
    }
  }
    document.cookie = `favorites=${JSON.stringify(newfavorites)}; expires=${new Date(
        Date.now * 1000
      ).toUTCString()}; path=/`;
      
    getFavorites()
  };
  
  export default removeFromFavorite;