import ads from "./ads"
let promoad = [];
let setPromoad = (ad = []) => {
  promoad = ad;
};
let createdAd = [];
let setCreatedAd = (ad = []) => {
    createdAd = ad;
};

const promotedPosts = (ev) => {
  let promos = ev.target.getElementsByClassName("promoted-product");
  for (let i = 0; i < promos.length; i++) {
    let promo = promos[i];
    const rect = promo.getBoundingClientRect();

    if (promo.dataset.adid) {
      let adid = promo.dataset.adid;
      const elInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      if (elInViewport) {
        if (promoad.length < 1) {
          setPromoad([...promoad, adid]);
          ads("promoad", adid);
        } else {
          let pa = false;
          for (let i = 0; i < promoad.length; i++) {
            if (promoad[i] === adid) {
              pa = true;
            }
          }
          if (!pa) {
            setPromoad([...promoad, adid]);
            ads("promoad", adid);
            console.log("this one is valid ");
          }
        }
      }
    }
  }
};
const createdPost = (ev) => {
  let createdAds = ev.target.getElementsByClassName("created-ad");
  for (let i = 0; i < createdAds.length; i++) {
    let cad = createdAds[i];
    const rect = cad.getBoundingClientRect();

    if (cad.dataset.adid) {
      let adid = cad.dataset.adid;
      const elInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      if (elInViewport) {
        if (createdAd.length < 1) {
          setCreatedAd([...createdAd, adid]);
          ads("ad", adid);
        } else {
          let ca = false;
          for (let i = 0; i < createdAd.length; i++) {
            if (createdAd[i] === adid) {
              ca = true;
            }
          }
          if (!ca) {
            setCreatedAd([...createdAd, adid]);
            ads("ad", adid);
            console.log("this one is valid ");
          }
        }
      }
    }
  }
};


const AdsChecker = () => {
  window.addEventListener("scroll", (ev) => {
    promotedPosts(ev);
    createdPost(ev)
  });
  window.addEventListener("load", (ev) => {
    promotedPosts(ev);
    createdPost(ev)
  });
};

export default AdsChecker
