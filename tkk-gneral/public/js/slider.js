
// SLIDER CONTROL
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (slides && dots) {
    
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-slider", "");
    }
    if (slides.length > 0) {
      
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active-slider";
    }
  }
}

let thumbnails = document.getElementsByClassName("thumbnail");

let activeImages = document.getElementsByClassName("active-image");

if (thumbnails && activeImages) {
  
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("mouseover", function () {
      if (activeImages.length > 0) {
        activeImages[0].classList.remove("active-image");
      }
      this.classList.add("active-image");
      document.querySelector("#featured").src = this.src;
    });
  }
}

let buttonRight = document.getElementById("arrowRight");
let buttonLeft = document.getElementById("arrowLeft");
if (buttonRight && buttonLeft) {
  
  buttonLeft.addEventListener("click", () => {
    $("#slider").animate({ scrollLeft: "-=180" }, 500, "swing");
  });
  
  buttonRight.addEventListener("click", () => {
    $("#slider").animate({ scrollLeft: "+=180" }, 500, "swing");
  });
  
}