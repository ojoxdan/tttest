const Modal = () => {

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
}

export default  Modal