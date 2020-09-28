document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //tabs
    const objTabs = {
        content: document.querySelectorAll('.tabcontent'),
        contentName: document.querySelectorAll('.tabheader__item'),

        startTabs: function () {
            this.content.forEach((item) => {
                item.style.display = 'none';
            });

            this.content[0].style.display = '';

            this.contentName.forEach((item, i) => {
                item.addEventListener('click', () => {
                    item.classList.add('tabheader__item_active');
                    this.content[i].style.display = '';

                    for (let j = 0; j < 4; j++) {
                        if (i == j) {
                            continue;
                        } else {
                            this.contentName[j].classList.remove('tabheader__item_active');
                            this.content[j].style.display = 'none';

                        }
                    }
                });
            });
        }
    };

    objTabs.startTabs();

    // Timer
    const deadline = '2020-09-29';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (10000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal
    const modal = document.querySelector('.modal');
    const btnWhite = document.querySelector('.btn');
    const btnClose = document.querySelector('.modal__close');

    function openModal() {
        modal.classList.add('show');
        //modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function startModal() {
        btnWhite.addEventListener('click',() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        btnClose.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });


        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                console.log('hello');
                openModal();
                window.removeEventListener('click', showModalByScroll);
            }
        }
    
        window.addEventListener('click', showModalByScroll);
    }

    const modalTimerId = setTimeout(openModal, 15000);

    startModal();

});