function IsInViewport(element, adid) {
  const rect = element.getBoundingClientRect();
  const elInViewport =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    console.log(elInViewport, `${adid} this is the view port response`)
}

export default IsInViewport;
