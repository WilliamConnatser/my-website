//Slow down videos
const bgVideo = document.getElementById('main-video')
bgVideo.playbackRate = .7
const portfolioVideo = document.getElementById('portfolio-video')
portfolioVideo.playbackRate = .7

//Nav Elements
const navToggleButtons = document.getElementsByClassName('nav-button')
const navButtonClose = document.getElementById('nav-button-close')
const navButtonOpen = document.getElementById('nav-button-open')
const navBar = document.getElementById('nav-bar')
const mainContent = document.getElementById('main-content')
const portfolioLink = document.getElementById('portfolio-link')
//Main Elements
const mainLink = document.getElementById('main-link')
const main = document.getElementById('main')
//Portfolio Elements
const portfolioWrapper = document.getElementById('portfolio-wrapper')
const portfolioContent = document.getElementById('portfolio')
const portfolioNav = document.getElementsByClassName('portfolio-nav')
const portfolioSlides = document.getElementsByClassName('slide')
const portfolioSlideBodies = [...portfolioSlides].map(slide =>slide.getElementsByClassName('body')[0])
const screenshotLinks = document.getElementsByClassName('screenshot-link')
const screenshotWrappers = document.getElementsByClassName('screenshot-wrapper')
const screenshotClose = document.getElementById('screenshot-close')

//Initialize state of app
let showMain = true
let showNav = false
let showScreenshots = false
let currentProject
let currentScreenshot
changeCarouselState('portfolio', 0)
changeCarouselState('screenshot', 0)

//Add event listeners to nav open/close button
for (let i = 0; i < navToggleButtons.length; i++) {
    navToggleButtons[i].onclick = () => {
        toggleNavBar()
    }
}

//Listen for nav item clicks on these two anchor tags
//If clicked then change the view
portfolioLink.onclick = () => {
    toggleViews()
    toggleNavBar()
}
mainLink.onclick = () => {
    toggleViews()
    toggleNavBar()
}

//After the nav bar animation ends
navBar.addEventListener('animationend', () => {
    //Check to see if it was just closed
    //If so then hide it
    if (!showNav) {
        navBar.style.display = 'none'
    }
});

//Handle portfolio carousel navigation clicks
for (let i = 0; i < portfolioNav.length; i++) {
    portfolioNav[i].onclick = (e) => {
        console.log(portfolioNav[i])
        if (e.target.classList.contains('portfolio')) {            
            if (e.target.id.includes('left')) {
                if (currentProject-1 >= 0) {
                    changeCarouselState('portfolio', currentProject - 1, currentProject)
                }
            } else {
                if (currentProject+1 < portfolioSlides.length) {
                    changeCarouselState('portfolio', currentProject + 1, currentProject)
                }
            }
        } else {
            if (e.target.id.includes('left')) {
                if (currentScreenshot - 1 >= 0) {
                    changeCarouselState('screenshot', currentScreenshot - 1, currentScreenshot)
                }
            } else if (e.target.id.includes('right')) {
                if (currentScreenshot + 1 < screenshotWrappers[currentProject].children.length) {
                    changeCarouselState('screenshot', currentScreenshot + 1, currentScreenshot)
                }
            } else {
                //Close screenshots
                console.log('close..')
                toggleScreenshots()
            }
        }
    }
}

//Add event listeners to screenshots links
for (let i = 0; i < screenshotLinks.length; i++) {
    screenshotLinks[i].onclick = () => {
        toggleScreenshots()
    }
}

function changeCarouselState(type, current, last) {
    if (type === 'portfolio') {
        //last will be 0 occassionally, so check for undefined instead
        if (last !== undefined) {
            portfolioSlides[last].style.display = 'none'
        }
        portfolioSlides[current].style.display = 'flex'
        currentProject = current
    } else {
        //Else change the screenshot carousel state
        if (last !== undefined) {
            screenshotWrappers[currentProject].children[last].style.display = 'none'
        }
        screenshotWrappers[currentProject].children[current].style.display = 'flex'
        currentScreenshot = current
    }
}

function toggleNavBar() {
    if(!showNav) navBar.style.display = 'flex'
    navButtonClose.style.display = showNav ? 'none' : 'inline'
    navButtonOpen.style.display = showNav ? 'inline' : 'none'
    navBar.style.animation = showNav ? 'slideUp .5s' : 'slideDown .5s'
    //If on the main page or portfolio page
    //Then we need to toggle different divs
    if (showMain) {
        mainContent.style.display = showNav ? 'flex' : 'none'
    } else {
        portfolioContent.style.display = showNav ? 'flex' : 'none'
    }
    showNav = !showNav
}

function toggleViews() {
    portfolioWrapper.style.display = showMain ? 'flex' : 'none'
    main.style.display = showMain ? 'none' : 'flex'
    portfolioLink.style.display = showMain ? 'none' : 'flex'
    mainLink.style.display = showMain ? 'flex' : 'none'
    showMain = !showMain
}

function toggleScreenshots() {
    showScreenshots = !showScreenshots
    screenshotWrappers[currentProject].style.display = showScreenshots ? 'flex' : 'none'
    portfolioSlideBodies[currentProject].style.display = showScreenshots ? 'none' : 'flex'
    screenshotClose.style.display = showScreenshots ? 'inline' : 'none'
    for (let i = 0; i < portfolioNav.length; i++) {
        portfolioNav[i].classList.toggle('portfolio')
        portfolioNav[i].classList.toggle('screenshot')
        console.log(portfolioNav[i].classList.value)
    }
}