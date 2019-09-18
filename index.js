const bgVideo = document.getElementById('main-video')
bgVideo.playbackRate = 0.4
const portfolioVideo = document.getElementById('portfolio-video')
portfolioVideo.playbackRate = 0.3

const navButtons = document.getElementsByClassName('nav-button')
const navButtonClose = document.getElementById('nav-button-close')
const navButtonOpen = document.getElementById('nav-button-open')
const navBar = document.getElementById('nav-bar')
const info = document.getElementById('info')
const portfolioLink = document.getElementById('portfolio-link')
const mainLink = document.getElementById('main-link')
const main = document.getElementById('main')
const portfolio = document.getElementById('portfolio')

let showMain = true
let showNav = false

for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].onclick = () => {
        //If the nav is being opened
        if (!showNav) {
            navBar.style.display = 'flex'
            info.style.display = 'none'
            navButtonClose.style.display = 'inline'
            navButtonOpen.style.display = 'none'
            navBar.style.animation = 'slideDown .5s'
        }
        //Else the nav is being closed
        else {
            navBar.style.animation = 'slideUp .5s'
            info.style.display = 'flex'
            portfolio.style.display = 'flex'
            navButtonClose.style.display = 'none'
            navButtonOpen.style.display = 'inline'
        }
        showNav = !showNav
    }
}

portfolioLink.onclick = () => {
    main.style.display = 'none'
    portfolio.style.display = 'flex'
    navBar.style.animation = 'slideUp .5s'
    navButtonClose.style.display = 'none'
    navButtonOpen.style.display = 'inline'
    mainLink.style.display = 'flex'
    portfolioLink.style.display = 'none'
    showNav = false
    showMain = false
}

mainLink.onclick = () => {
    portfolio.style.display = 'none'
    main.style.display = 'flex'
    navBar.style.animation = 'slideUp .5s'
    navButtonClose.style.display = 'none'
    navButtonOpen.style.display = 'inline'
    portfolioLink.style.display = 'flex'
    mainLink.style.display = 'none'
    showMain = true
    showNav = false
}

navBar.addEventListener('animationend', () => {
    console.log(showNav, 'showNav')
    if (!showNav) {
        navBar.style.display = 'none'
    }
});

const porfolioNav = document.getElementsByClassName('portfolio-nav')
const portfolioSlides = document.getElementsByClassName('portfolio-slide')
let portfolioSlide = 0
for (let i = 0; i < porfolioNav.length; i++) {
    porfolioNav[i].onclick = (e) => {
        if (e.target.id.includes('left')) {
            if (portfolioSlide-1 >= 0) {
                portfolioSlide = portfolioSlide - 1
            }
        } else {
            if (portfolioSlide+1 < portfolioSlides.length) {
                portfolioSlide = portfolioSlide + 1
            }
        }
        setPortfolioSlide()
    }
}

setPortfolioSlide()
function setPortfolioSlide() {
    for (let i = 0; i < portfolioSlides.length; i++) {
        if (portfolioSlide === i) {
            portfolioSlides[i].style.display = 'flex'
        } else {
            portfolioSlides[i].style.display = 'none'
        }
    }
}