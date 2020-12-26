$(document).ready(function () {
  document
    .getElementById("choose-image")
    .addEventListener("change", readImage, false);

  $(".preview-images-zone").sortable();

  $(document).on("click", ".image-cancel", function () {
    let no = $(this).data("no");
    $(".preview-image.preview-show-" + no).remove();
  });
});

var num = 1;
function readImage() {
  if (window.File && window.FileList && window.FileReader) {
    var files = event.target.files; //FileList object
    var output = $(".preview-images-zone");

    for (let i = 0; i < files.length; i++) {
      var file = files[i];
      if (!file.type.match("image")) continue;

      var picReader = new FileReader();

      picReader.addEventListener("load", function (event) {
        var picFile = event.target;
        var html =
          '<div class="preview-image preview-show-' +
          num +
          '">' +
          '<div class="image-cancel" data-no="' +
          num +
          '">x</div>' +
          '<div class="image-zone"><img id="pro-img-' +
          num +
          '" src="' +
          picFile.result +
          '"></div>';

        output.append(html);
        num = num + 1;
      });

      picReader.readAsDataURL(file);
    }
    $("#choose-image").val("");
  } else {
    console.log("Browser not support");
  }
}

$("#next").on("click", function (e) {
  console.log(e.target);
  nextSection();
});

$("form").on("submit", function (e) {
  if ($("#next").is(":visible") || $("fieldset.current").index() < 1) {
    e.preventDefault();
  }
});

function goToSection(i) {
  $("fieldset:gt(" + i + ")")
    .removeClass("current")
    .addClass("next");
  $("fieldset:lt(" + i + ")").removeClass("current");
  $("li").eq(i).addClass("current").siblings().removeClass("current");
  setTimeout(function () {
    $("fieldset").eq(i).removeClass("next").addClass("current active");
    if ($("fieldset.current").index() == 1) {
      $("#next").hide();
      $("input[type=submit]").show();
      $(".info").show();
    } else {
      $("#next").show();
      $("input[type=submit]").hide();
      $(".info").hide();
    }
  }, 80);
}

function nextSection() {
  var i = $("fieldset.current").index();
  if (i < 3) {
    $("li")
      .eq(i + 1)
      .addClass("active");
    goToSection(i + 1);
  }
}

$("li").on("click", function (e) {
  var i = $(this).index();
  if ($(this).hasClass("active")) {
    goToSection(i);
  } 
  // else {
  //   alert("You need to complete this section first");
  // }
});

// VIDEO SELECTOR
document.getElementById('choose-video').onchange = function (event) {
  let file = event.target.files[0];
  let blobURL = URL.createObjectURL(file);
  document.querySelector('.preview-zone .video-container video').src = blobURL;
  document.querySelector('.preview-zone .video-container video').style.display = 'block';
}

// INPUT LENGTH VALIDATOR
function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
      limitField.value = limitField.value.substring(0, limitNum);
  } else {
      limitCount.value = limitNum - limitField.value.length;
  }
}
var title = document.getElementById('title');
var title_count = document.getElementById('title-count');
var description = document.getElementById('description');
var description_count = document.getElementById('description-count');

title.addEventListener('keyup', function () {
  title_count.innerHTML = title.value.length;
})
description.addEventListener('keyup', function () {
  description_count.innerHTML = description.value.length;
})

