function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {

    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const slidesWraper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);

    const width = window.getComputedStyle(slidesWraper).width;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    // dot indicators

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function slidesTranslateX() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function currentText() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotActive() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function widthReplace() {
        return +width.replace(/\D/g, '');
    }

    function delNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
        if (offset == delNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += delNotDigits(width);
        }

        slidesTranslateX();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentText();
        dotActive();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = delNotDigits(width) * (slides.length - 1);
        } else {
            offset -= delNotDigits(width);
        }

        slidesTranslateX();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentText();
        dotActive();
    });

    // dots listener
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = delNotDigits(width) * (slideTo - 1);

            slidesTranslateX();
            currentText();
            dotActive();

        });
    });

}

export default slider;