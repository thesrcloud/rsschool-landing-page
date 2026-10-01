const $body = document.querySelector("body");
const $header = document.querySelector("header");
const $logo = document.querySelector(".logo");
const $header_nav = document.querySelector(".header__nav");
const $nav_list = document.querySelector(".nav__list");
const $header_burger_button = document.querySelector(".header__burger-button");
let $burger_menu_status = "Closed";

$header_burger_button.addEventListener("click", openMenu);
$header_nav.addEventListener("animationend", checkMenu);
window.addEventListener('resize', () => {
    if (innerWidth > 768) {
        resetMenu();
        $header_burger_button.classList.remove("header__burger-button_opened");
    }
})

function openMenu() {
    if ($burger_menu_status == 'Closed') {
        $body.classList.add("pos-rel-hid");
        $logo.classList.add("pos-rel-z2");
        $header_burger_button.classList.add("pos-rel-z2", "header__burger-button_opened");
        $header_nav.classList.add("burger-menu_active", "burger-menu", "show-from-right");
        $nav_list.classList.add("burger-menu__wrapper");

    } else if ($burger_menu_status == "Opened") {
        $header_nav.classList.add("move-to-right");
        $header_burger_button.classList.remove("header__burger-button_opened");
    }
}

function checkMenu() {
    if ($burger_menu_status == 'Closed') {
        $header_nav.classList.remove("show-from-right");
        $burger_menu_status = "Opened";
    } else if ($burger_menu_status == "Opened") {
        resetMenu();
    }
}

function resetMenu() {
    $header_nav.classList.remove("move-to-right");
    $body.classList.remove("pos-rel-hid");
    $logo.classList.remove("pos-rel-z2");
    $header_burger_button.classList.remove("pos-rel-z2");
    $header_nav.classList.remove("burger-menu_active", "burger-menu");
    $nav_list.classList.remove("burger-menu__wrapper");
    $burger_menu_status = "Closed";
}


Array.from($header.children).forEach(item => {
    item.addEventListener('click', (e) => {
        if ($header_nav.classList.contains('burger-menu') && (e.target.classList.contains('nav__link') || e.target.classList.contains('logo'))) {
            let a = e.target.getAttribute('href');
            let closeMenu = () => {
                checkMenu();
                location.href = a;
                $header_nav.removeEventListener('animationend', closeMenu);
                $header_nav.addEventListener("animationend", checkMenu);
            }
            e.preventDefault();
            $header_nav.classList.add("move-to-right");
            $header_burger_button.classList.remove("header__burger-button_opened");
            $header_nav.removeEventListener("animationend", checkMenu);
            $header_nav.addEventListener('animationend', closeMenu);
        }
    })
})