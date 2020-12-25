// MENU TOGGLES ON MOBILE SCREEN
$("#toggle").click(function () {
  $(".sidebar-menu").toggle("slow");
});
$("#homepageToggler").click(function () {
  $(".homepage-filter").toggle("slow");
});
$("#dashboard-navigation").click(function () {
  $(".dashboard-sidebar").toggle("slow");
});
$("#settings-navigation").click(function () {
  $(".settings-sidebar").toggle("slow");
});

// OPENS CART DROPDOWN
function showDropDown() {
  document.querySelector(".cart-dropdown-content").classList.toggle("show");
}
window.onclick = (event) => {
  if (!event.target.matches('.dropdown-body')) {
      var dropdowns = document.getElementsByClassName("cart-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}
// END CART DROPDOWN

// SCROLL TO TOP
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //   document.getElementById("scrollToTop").style.display = "block";
  // } else {
  //   document.getElementById("scrollToTop").style.display = "none";
  // }
}
// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// END SCROLL TO TOP

// PRODUCTS PAGE MODAL
var modal = document.getElementById("myModal");
// Get the image and insert it inside the modal
var open = document.getElementById("open");
if (open) {
  
  var currentImage = document.getElementById("open").previousElementSibling;
  var modalImg = document.getElementById("modalImg");
  // SHOW MODALS ON CLICK
  open.addEventListener("click", activemodal);
}
function openmodal() {
  modal.style.display = "block";
  modalImg.src = this.src;
}
function activemodal() {
  modal.style.display = "block";
  modalImg.src = currentImage.src;
}
// SHOW MODALS ONCE IMAGE IS CLICKED
var images = document.querySelectorAll(".product-image-slider .image");
Array.from(images).forEach(function (item) {
  item.addEventListener("click", openmodal);
});
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];
if (span) {
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
}


