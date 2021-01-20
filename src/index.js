const dogURL = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded", () => {
  getDogs()
  addFilteredEvent()
})

let doggies = []
let filterOn = false 
   
// Fetch and render all dogs 
function getDogs() {
  fetch(dogURL)
    .then((res) => res.json())
    .then((dogs) => {
      dogs.forEach((dog) => renderDog(dog))
    })
}
 
// Step 2: Add dog's name to span in dog bar (#dog-bar)
function renderDog(dog) {
  let dogBar = document.querySelector("#dog-bar")
   
  let dogSpan = document.createElement("span")
      dogSpan.innerText = dog.name
      dogSpan.addEventListener('click', () => renderDogInfo(dog))
         
  dogBar.append(dogSpan) 
}

/* STEP 3: SHOW MORE INFO ABOUT EACH PUP 
- Add click event for when user clicks on dog's span in dog bar 
- the dog's info (image, name, isGoodDog status) shows up in the div with id (#dog-info) 
// with the following childen */
function renderDogInfo(dog) {
  let dogContainer = document.querySelector("#dog-info")
      dogContainer.innerText = ""
  
  let dogImg = document.createElement('img')
      dogImg.src = dog.image
  
  let dogName = document.createElement('h2')
      dogName.innerText = dog.name

  let dogBtn = document.createElement('button')
  // dog.isGoodDog ? dogBtn.innerText = "Good Dog!" : dogBtn.innerText = "Bad Dog!"
  // this code above is same exact as if/else below    
      if (dog.isGoodDog === true) {
        dogBtn.innerText = "Good Dog!"
      } else {
        dogBtn.innerText = "Bad Dog!"
      }
      dogBtn.addEventListener("click", () => updateStatus(dog))

  dogContainer.append(dogImg, dogName, dogBtn)
}

function updateStatus(dog) {
  let dogStatus 
    if (dog.isGoodDog === true) {
      dogStatus = false
    } else { 
      dogStatus = true 
    }

  let newStatus = {
    isGoodDog: dogStatus
  }

  let reqPack = {
    headers: { "Content-Type": "application/json" },
    method: "PATCH", 
    body: JSON.stringify(newStatus)
    }

  fetch(dogURL + dog.id, reqPack)
    .then(resp => resp.json())
    .then((dog) => {
      renderDogInfo(dog)
    })
}
  

      
// BONUS Function for dog filter 
// Does not work yet 
const addFilteredEvent = () => {
  const filterBtn = document.querySelector('#good-dog-filter')
  filterBtn.addEventListener('click', () => {
    filterOn = !filterOn

    if (filterOn) {
      filterBtn.innerText = "Filter good dogs: OFF"
    } else {
      filterBtn.innerText = "Filter good dogs: ON"
    }

    const filteredDogs = dogs.filter(dog => {
      if (filterOn) {
        return dog.isGoodDog
      } else {
        return true
      }
    })

    let dogBar = document.querySelector("#dog-bar")
    dogBar.innerHTML = ""
    renderDogs(filteredDogs)
  })
} 


    
    
    
    
   