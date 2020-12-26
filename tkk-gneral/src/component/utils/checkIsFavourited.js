import getFavorites from "./getFavorites";

const removeFromFavorite = (postid, setValue) => {
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

  let favouriteExist = [];
  for (let i = 0; i < favorites.length; i++) {
    if (postid == favorites[i].id.trim()) {
      favouriteExist.push(favorites[i]);
    }
  }
  if (favouriteExist.length > 0) {
    setValue(true);
  } else {
    setValue(false);
  }
};

export default removeFromFavorite;
