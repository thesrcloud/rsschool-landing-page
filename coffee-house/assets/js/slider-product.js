let carouselCard = document.querySelector('.carousel__card');
let sliderButtons = Array.from(document.querySelectorAll('.pr-slider__button'));
let updateButton = document.querySelector('.pr-slider__update-button');
let initialCategory = 'Coffee';
let currentCategory = initialCategory;
let targetCategoryProducts = [];
let updateStatus = 0;

fetch('../../assets/json/products.json')
    .then(res => {
        return res.json();
    }).then(data => {
        let products = data;

        console.log(products)

        createFromWindowSize(products);

        sliderButtons.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('pr-slider__button_active')) {
                    carouselCard.innerHTML = '';
                    currentCategory = item.id;
                    updateStatus = 0;

                    sliderButtons.forEach(elem => {
                        if (elem.classList.contains('pr-slider__button_active')) {
                            elem.classList.remove('pr-slider__button_active');
                        }
                    })

                    item.classList.add('pr-slider__button_active');
                    createFromWindowSize(products);
                }
            })
        })

        updateButton.addEventListener('click', () => {
            updateButton.classList.add('rotate-item');

            updateButton.addEventListener('animationend', () => {
                updateButton.classList.remove('rotate-item');
                carouselCard.innerHTML = '';
                searchCategoryProducts(currentCategory, products);
                makeCards();
                updateButton.classList.add('btn-d-none');
                updateStatus = 1;
            })
        })

        window.addEventListener('resize', () => {
            console.log(window.innerWidth)
            if (window.innerWidth > 768) {
                if (carouselCard.children.length < targetCategoryProducts.length) {
                    carouselCard.innerHTML = '';
                    searchCategoryProducts(currentCategory, products);
                    makeCards();
                    updateButton.classList.add('btn-d-none');
                    updateStatus = 0;
                }
            }

            if (window.innerWidth <= 768) {
                if (carouselCard.children.length = targetCategoryProducts.length && updateStatus != 1) {
                    console.log(carouselCard.children.length)
                    console.log(targetCategoryProducts.length)
                    carouselCard.innerHTML = '';
                    searchCategoryProducts(currentCategory, products);
                    makeCards(4);
                }
            }
        })
    });

function createFromWindowSize(arr) {
    if (window.innerWidth <= 768) {
        searchCategoryProducts(currentCategory, arr);
        makeCards(4);
        if (targetCategoryProducts.length <= 4) updateButton.classList.add('btn-d-none')
    } else {
        searchCategoryProducts(currentCategory, arr);
        makeCards();
    }
}


function makeCards(targetValue = targetCategoryProducts.length) {
    for (let i = 0; i < targetValue; i++) {
        let { image, name, description, price } = targetCategoryProducts[i];
        let cardTemplate = `
                 <div class="pr-card">
                     <div class="pr-card__image-wrapper">
                       <img src="${image}" alt="${name}">
                     </div>
                 
                     <div class="pr-card__info">
                       <h3 class="pr-card__title title-h3">${name}</h3>
                       <p class="pr-card__description">${description}</p>
                       <span class="pr-card__price title-h3">$${price}</span>
                     </div>
                 </div>
        `;
        carouselCard.innerHTML += cardTemplate;
    }
}

function searchCategoryProducts(target, arr) {
    targetCategoryProducts = [];
    arr.forEach(item => {
        if (item.category == target.toLowerCase()) targetCategoryProducts.push(item);
    });

    if (targetCategoryProducts.length > 4 && window.innerWidth <= 768) {
        updateButton.classList.remove('btn-d-none');
    }
}