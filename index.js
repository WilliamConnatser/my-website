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
const portfolioSlideBodies = [...portfolioSlides].map(
   (slide) => slide.getElementsByClassName('body')[0],
)
const screenshotLinks = document.getElementsByClassName('screenshot-link')
const screenshotWrappers = document.getElementsByClassName('screenshot-wrapper')
const screenshotClose = document.getElementById('screenshot-close')
//Technologies
const technologiesWrapper = document.querySelector('.tech-container')
//Parse technologies used from Portfolio section
const technologies = Array.from(document.querySelectorAll('.tech-used')).reduce(
   (accumulated, current) => {
      const newSkills = []
      for (child of current.children) {
         if (!accumulated.includes(child.textContent)) {
            newSkills.push(child.textContent)
         }
      }
      return accumulated.concat(newSkills)
   },
   [],
)
//Add technology skills
technologies.forEach((tech) => {
   const newButton = document.createElement('div')
   newButton.textContent = tech
   newButton.classList.add('tech-skill')
   technologiesWrapper.appendChild(newButton)
})
//Slow down video
const bgVideo = document.getElementById('technologies-video')
bgVideo.playbackRate = 0.25

//Initialize state of app
let showMain = true
let showNav = false
let showScreenshots = false
let currentProject
let currentScreenshot
changeCarouselState('portfolio', 0)
changeCarouselState('screenshot', 0)

//Add event listeners to nav open/close button
// for (let i = 0; i < navToggleButtons.length; i++) {
//    navToggleButtons[i].onclick = () => {
//       toggleNavBar()
//    }
// }

//Listen for nav item clicks on these two anchor tags
//If clicked then change the view
// portfolioLink.onclick = () => {
//    //Todo: Scroll to portfolio section
//    toggleNavBar()
// }
// mainLink.onclick = () => {
//    //Todo: Scroll to main section
//    toggleNavBar()
// }

//After the nav bar animation ends
// navBar.addEventListener('animationend', () => {
//    //Check to see if it was just closed
//    //If so then hide it
//    if (!showNav) {
//       navBar.style.display = 'none'
//    }
// })

//Handle portfolio carousel navigation clicks
for (let i = 0; i < portfolioNav.length; i++) {
   portfolioNav[i].onclick = (e) => {
      if (e.target.classList.contains('portfolio')) {
         changeCarouselState('screenshot', 0, currentScreenshot)
         if (e.target.id.includes('left')) {
            if (currentProject - 1 >= 0) {
               changeCarouselState(
                  'portfolio',
                  currentProject - 1,
                  currentProject,
               )
            } else {
               changeCarouselState(
                  'portfolio',
                  portfolioSlides.length - 1,
                  currentProject,
               )
            }
         } else {
            if (currentProject + 1 < portfolioSlides.length) {
               changeCarouselState(
                  'portfolio',
                  currentProject + 1,
                  currentProject,
               )
            } else {
               changeCarouselState('portfolio', 0, currentProject)
            }
         }
         changeCarouselState('screenshot', 0)
      } else {
         if (e.target.id.includes('left')) {
            if (currentScreenshot - 1 >= 0) {
               changeCarouselState(
                  'screenshot',
                  currentScreenshot - 1,
                  currentScreenshot,
               )
            } else {
               changeCarouselState(
                  'screenshot',
                  screenshotWrappers[currentProject].children.length - 1,
                  currentScreenshot,
               )
            }
         } else if (e.target.id.includes('right')) {
            if (
               currentScreenshot + 1 <
               screenshotWrappers[currentProject].children.length
            ) {
               changeCarouselState(
                  'screenshot',
                  currentScreenshot + 1,
                  currentScreenshot,
               )
            } else {
               changeCarouselState('screenshot', 0, currentScreenshot)
            }
         } else {
            //Close screenshots
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
      if (last !== undefined) {
         portfolioSlides[last].style.display = 'none'
         screenshotWrappers[current].children[currentScreenshot].style.display =
            'none'
      }
      currentProject = current
      portfolioSlides[current].style.display = 'flex'
      currentScreenshot = 0
   } else {
      //Else change the screenshot carousel state
      if (last !== undefined) {
         screenshotWrappers[currentProject].children[last].style.display =
            'none'
      }
      currentScreenshot = current
      screenshotWrappers[currentProject].children[current].style.display =
         'flex'
   }
}

function toggleNavBar() {
   if (!showNav) navBar.style.display = 'flex'
   navButtonClose.style.display = showNav ? 'none' : 'inline'
   navButtonOpen.style.display = showNav ? 'inline' : 'none'
   navBar.style.animation = showNav ? 'slideUp .5s' : 'slideDown .5s'
   //Hide content so nav bar is clearly legible
   mainContent.style.display = showNav ? 'flex' : 'none'
   portfolioContent.style.display = showNav ? 'flex' : 'none'
   showNav = !showNav
}

function toggleScreenshots() {
   showScreenshots = !showScreenshots
   screenshotWrappers[currentProject].style.display = showScreenshots
      ? 'flex'
      : 'none'
   portfolioSlideBodies[currentProject].style.display = showScreenshots
      ? 'none'
      : 'flex'
   screenshotClose.style.display = showScreenshots ? 'inline' : 'none'
   for (let i = 0; i < portfolioNav.length; i++) {
      portfolioNav[i].classList.toggle('portfolio')
      portfolioNav[i].classList.toggle('screenshot')
   }
}
