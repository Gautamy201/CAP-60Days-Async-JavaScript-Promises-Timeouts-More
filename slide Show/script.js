const startbtn = document.getElementById("start");
const stopbtn = document.getElementById("stop");
const nextbtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const slideImages = document.querySelectorAll(".slide-show_panel img");
let interval;
let slideIndex = 1;
// -------------  slide menualy run in on click previous button function code are here ---------------------------
prevBtn.addEventListener("click", () => {
  startbtn.style.display = "block";
  stopbtn.style.display = "none";
  if (slideIndex < 0) {
    slideIndex = slideImages.length - 1;
  }
  clearInterval(interval);
  slideShow(slideImages, slideIndex);
  slideIndex--;
});
// -------------  slide auto run in on click strt button function code are here ------------------------------
startbtn.addEventListener("click", () => {
  startbtn.style.display = "none";
  stopbtn.style.display = "block";
  interval = setInterval(() => {
    if (slideIndex === slideImages.length) {
      slideIndex = 0;
    }
    slideShow(slideImages, slideIndex);
    slideIndex++;
  }, 1000);
});

stopbtn.addEventListener("click", () => {
  startbtn.style.display = "block";
  stopbtn.style.display = "none";
  clearInterval(interval);
});
// -------------  slide menualy run in on click next button function code are here ------------------------------
nextbtn.addEventListener("click", () => {
  startbtn.style.display = "block";
  stopbtn.style.display = "none";
  if (slideIndex === slideImages.length) {
    slideIndex = 0;
  }
  clearInterval(interval);
  slideShow(slideImages, slideIndex);
  slideIndex++;
});
// -------------  slide run function code are here ------------------------------
function slideShow(images, ind) {
  images.forEach((value, index) => {
    if (ind === index) {
      value.setAttribute("id", "active");
    } else {
      value.removeAttribute("id", "active");
    }
  });
}
