//get the gallery container
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");

//make fetch request to API
async function logMovies() {
  const response = await fetch("https://randomuser.me/api/?results=12&?nat=us");
  const employees = await response.json();
  const employeesData = employees.results;
  //create card and add it to the Gallery element
  const createCard = () => {
    let html = "";
    //loop through employee data
    employeesData.forEach((employee) => {
      //update html string with employee data
      html += `<div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
      </div>`;
    });
    //append html to the gallery
    gallery.insertAdjacentHTML("beforeend", html);
  };
  createCard();

  const employeeCards = document.querySelectorAll(".card");

  //loop through cards
  employeeCards.forEach((card) => {
    //add click event listener to each card element
    card.addEventListener("click", (event) => {
      //display the modal
      //create modal
      const popUp = document.createElement("div");
      popUp.classList.add("modal-container");
      //add html for modal
      popUp.innerHTML += `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>`;
      //add modal to the DOM
      body.insertAdjacentElement("beforeend", popUp);
      const closeIcon = document.getElementById("modal-close-btn");
      //add event listener to close icon to hide the modal
      closeIcon.addEventListener("click", (event) => {
        const modal = event.target.closest(".modal-container");
        modal.remove();
      });
    });
  });
}

logMovies();
