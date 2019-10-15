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
