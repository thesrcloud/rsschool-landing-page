const carousel = document.querySelector('.carousel');
let sliderButtons = Array.from(document.querySelectorAll('.slider-button'));
let pagimationLeds = Array.from(document.querySelectorAll('.paginagion__button-led'));
const numberOfCards = carousel.children.length;
let currentCard = 0;
let cardTime = 4;
let currentCardTime = 0;
let swipeCourse = null;
let timer = null;
let timeFromPause = 0;
let pauseStatus = 0;
let pauseTimer = setInterval(() => {
    if (timeFromPause >= cardTime * 1000) timeFromPause = 0;
    timeFromPause += 100;
    // console.log(timeFromPause)
}, 100);

showPaginationStatus();

let autoCardChange = setInterval(() => {

    timeFromPause = 0;

    if (!carousel.classList.contains('paused')) {
        getNextCard();
        showPaginationStatus();
    } else (
        pausetimer = setInterval(() => {
            timeFromPause += 100;
            // console.log(timeFromPause)
        }, 100)
    )
}, cardTime * 1000);

sliderButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        clearInterval(autoCardChange);
        if (item.classList.contains('sb-next')) {
            // console.log('click');
            getNextCard();
            showPaginationStatus();
            timeFromPause = 0;
        } else if (item.classList.contains('sb-prev')) {
            getPrevCard();
            showPaginationStatus();
            timeFromPause = 0;
        }

        autoCardChange = setInterval(() => {
            getNextCard();
            showPaginationStatus();
        }, cardTime * 1000);
    })
})



function getNextCard() {
    if (currentCard < numberOfCards - 1) {
        carousel.style.translate = `-${(currentCard + 1) * 100}%`;
        currentCard++;
    } else {
        currentCard = 0;
        carousel.style.translate = '0%';
    }
}

function getPrevCard() {
    if (currentCard == 0) {
        currentCard = numberOfCards - 1;
        carousel.style.translate = `-${(numberOfCards - 1) * 100}%`;
    } else {
        carousel.style.translate = `-${(currentCard - 1) * 100}%`;
        currentCard--;
    }
}

function showPaginationStatus() {
    pagimationLeds.forEach((item, index, arr) => {
        // console.log(currentCard, 'index:', index);
        if (item.classList.contains('pagination-button_active')) {
            item.style.width = '0%';
            item.classList.remove('pagination-button_active');
        } else {
            if (index == currentCard) {
                // console.log(currentCard, index);
                item.classList.add('pagination-button_active');
                let elem = document.querySelector('.pagination-button_active');
                elem.style.width = '100%';
            }
        }
    })
}

carousel.addEventListener('mouseenter', manipulationToch);
carousel.addEventListener('mouseleave', manipulationMove);
carousel.addEventListener('touchstart', (e) => {
    manipulationToch();
    startTouch(e);
}, false);
carousel.addEventListener('touchend', (e) => {
    manipulationMove(e);
    e.preventDefault();
    if (swipeCourse != null) {
        clearInterval(autoCardChange);
        if (swipeCourse == 'right') {
            getPrevCard();
            showPaginationStatus();
            timeFromPause = 0;
        } else if (swipeCourse == 'left') {
            getNextCard();
            showPaginationStatus();
            timeFromPause = 0;
        }

        autoCardChange = setInterval(() => {
            getNextCard();
            showPaginationStatus();
        }, cardTime * 1000);

        swipeCourse = null;
    }
});
carousel.addEventListener('touchmove', endTouch, false);


function manipulationToch() {
    let elem = document.querySelector('.pagination-button_active');
    elem.style.animationPlayState = "paused";
    carousel.classList.add('paused');
    // console.log('click mouse');
    // console.log(elem);
    // console.log(elem.style.width);
    clearInterval(pauseTimer);
    clearInterval(autoCardChange);
}

function manipulationMove() {
    let elem = document.querySelector('.pagination-button_active');
    elem.style.animationPlayState = "running";
    carousel.classList.remove('paused');
    // console.log(timeFromPause);
    pauseTimer = setInterval(() => {
        if (timeFromPause >= cardTime * 1000) timeFromPause = 0;
        timeFromPause += 100;
        // console.log(timeFromPause)
    }, 100);
    autoCardChange = setInterval(() => {
        clearInterval(timeFromPause);
        timeFromPause = 0;

        if (pauseStatus == 1) {
            resetTimer()
        }

        if (!carousel.classList.contains('paused')) {
            getNextCard();
            showPaginationStatus();
        } else (
            pausetimer = setInterval(() => {
                timeFromPause += 100;
                // console.log(timeFromPause)
            }, 100)
        )
    }, (cardTime * 1000) - timeFromPause);
    pauseStatus = 1;
}

function resetTimer() {
    clearInterval(autoCardChange);
    clearInterval(pauseTimer);
    // console.log('000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
    pauseTimer = setInterval(() => {
        if (timeFromPause >= cardTime * 1000) timeFromPause = 0;
        timeFromPause += 100;
        // console.log(timeFromPause)
    }, 100);
    autoCardChange = setInterval(() => {
        clearInterval(timeFromPause);
        timeFromPause = 0;

        if (!carousel.classList.contains('paused')) {
            getNextCard();
            showPaginationStatus();
        } else (
            pausetimer = setInterval(() => {
                if (timeFromPause >= cardTime * 1000) timeFromPause = 0;
                timeFromPause += 100;
                // console.log(timeFromPause)
            }, 100)
        )
    }, cardTime * 1000);
    pauseStatus = 0;
}

// Swipes:


let x1 = null;
let y1 = null;

function startTouch(event) {
    const clientTouch = event.touches[0];

    x1 = clientTouch.clientX;
    y1 = clientTouch.clientY;
}

function endTouch(event) {
    if (!x1 || !y1) {
        return false;
    }

    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            swipeCourse = 'right';
        } else {
            swipeCourse = 'left';
        }

    } else {
        // top - bottom
        // if (yDiff > 0) {
        //     console.log('down');
        // } else {
        //     console.log('top');
        // }

        x1 = null;
        y1 = null;
    }
}