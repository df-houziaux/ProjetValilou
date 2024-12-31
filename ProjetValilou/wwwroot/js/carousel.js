document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slides img");
    let index = 0;

    function nextSlide() {

        slides[index].classList.remove('active');


        index = (index + 1) % slides.length;


        slides[index].classList.add('active');
    }


    slides[index].classList.add('active');


    setInterval(nextSlide, 5000);
});
