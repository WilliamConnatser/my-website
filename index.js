//Slow down videos
const bgVideo = document.getElementById('main-video')
bgVideo.playbackRate = .7
const portfolioVideo = document.getElementById('portfolio-video')
portfolioVideo.playbackRate = .7

//Select applicable DOM elements
const navToggleButtons = document.getElementsByClassName('nav-button')
const navButtonClose = document.getElementById('nav-button-close')
const navButtonOpen = document.getElementById('nav-button-open')
const navBar = document.getElementById('nav-bar')
const mainContent = document.getElementById('main-content')
const portfolioLink = document.getElementById('portfolio-link')
const mainLink = document.getElementById('main-link')
const main = document.getElementById('main')
const portfolio = document.getElementById('portfolio')
const portfolioContent = document.getElementById('portfolio-content')
const porfolioNav = document.getElementsByClassName('portfolio-nav')
const portfolioSlides = document.getElementsByClassName('slide')

//Initialize state
let showMain = true
let showNav = false
let currentSlide = 0
setPortfolioSlide()

//Add event listeners to nav open/close button
for (let i = 0; i < navToggleButtons.length; i++) {
    navToggleButtons[i].onclick = () => {
        //If the nav bar is being opened
        if (!showNav) {
            openNavBar()
        }
        //Else the nav bar is being closed
        else {
            closeNavBar()
        }
    }
}

//Listen for nav item clicks on these two anchor tags
//If clicked then change the view
portfolioLink.onclick = () => {
    toggleViews()
    closeNavBar()
}
mainLink.onclick = () => {
    toggleViews()
    closeNavBar()
}

//After the nav bar animation ends
navBar.addEventListener('animationend', () => {
    //Check to see if it was just closed
    //If so then hide it
    if (!showNav) {
        navBar.style.display = 'none'
    }
});

//Handle carousel navigation clicks
for (let i = 0; i < porfolioNav.length; i++) {
    porfolioNav[i].onclick = (e) => {
        const lastSlide = currentSlide
        if (e.target.id.includes('left')) {
            if (currentSlide-1 >= 0) {
                currentSlide = currentSlide - 1
            }
        } else {
            if (currentSlide+1 < portfolioSlides.length) {
                currentSlide = currentSlide + 1
            }
        }
        setPortfolioSlide(lastSlide)
    }
}

//Hide last slide and show new slide
function setPortfolioSlide(lastSlide) {
    //lastSlide will be 0 occassionally, so check for undefined instead
    if (lastSlide !== undefined) {
        portfolioSlides[lastSlide].style.display = 'none'
    }
    portfolioSlides[currentSlide].style.display = 'flex'
}


function closeNavBar() {
    navButtonClose.style.display = 'none'
    navButtonOpen.style.display = 'inline'
    navBar.style.animation = 'slideUp .5s'
    showNav = false
    //If on the main page or portfolio page
    //Then we need to toggle different divs
    if (showMain) {
        mainContent.style.display = 'flex'
    } else {
        portfolioContent.style.display = 'flex'
    }
}

function openNavBar() {
    navBar.style.display = 'flex'
    navButtonClose.style.display = 'inline'
    navButtonOpen.style.display = 'none'
    navBar.style.animation = 'slideDown .5s'
    showNav = true
    //If on the main page or portfolio page
    //Then we need to toggle different divs
    if (showMain) {
        mainContent.style.display = 'none'
    } else {
        portfolioContent.style.display = 'none'
    }
}

function toggleViews() {
    portfolio.style.display = showMain ? 'flex' : 'none'
    main.style.display = showMain ? 'none' : 'flex'
    portfolioLink.style.display = showMain ? 'none' : 'flex'
    mainLink.style.display = showMain ? 'flex' : 'none'
    showMain = !showMain
}