async function getImages() {
  let a = await fetch("/img/slider/");
  console.log(a)
  let responce = await a.text();
  let div = document.createElement("div");
  div.innerHTML = responce;
  let as = div.getElementsByTagName("a");
  images = [];
  for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if ((element.href.endsWith(".webp")) || (element.href.endsWith(".png")) || (element.href.endsWith(".jpg")) || (element.href.endsWith(".jpeg"))) {
          images.push(element.href.split(`/slider/`)[1]);
      }
  }
  console.log(images)

  let imgSlider = document.querySelector(".slider");
  for (const image of images) {
      imgSlider.innerHTML += `<div class="slide"><img src="img/slider/${image}" alt="Image 1"></div>`;
  }

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          if (i === index) {
              slide.style.display = 'block';
          } else {
              slide.style.display = 'none';
          }
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
  }

  // Setup event listeners after images are fetched and slider is created
  document.querySelector('.prev').addEventListener('click', prevSlide);
  document.querySelector('.next').addEventListener('click', nextSlide);

  // Auto slide change
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

getImages();
