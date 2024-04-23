let slideIndex = 0;

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("carousel-slide");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 7000); // Cambia la imagen cada 5 segundos (5000 milisegundos)
}

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
});


function zoomImage(card) {
  var zoomedImage = document.getElementById("zoomed-image");
  zoomedImage.src = card.querySelector("img").src;

  var overlay = document.getElementById("overlay");
  var zoomContainer = document.getElementById("zoom-container");

  overlay.style.display = "block";
  zoomContainer.style.display = "block";

  setTimeout(function () {
      overlay.style.opacity = 1;
      zoomContainer.style.opacity = 1;
  }, 10);
}

function closeZoom() {
  var overlay = document.getElementById("overlay");
  var zoomContainer = document.getElementById("zoom-container");

  overlay.style.opacity = 0;
  zoomContainer.style.opacity = 0;

  setTimeout(function () {
      overlay.style.display = "none";
      zoomContainer.style.display = "none";
  }, 300);
}
