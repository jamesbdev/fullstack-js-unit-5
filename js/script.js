//get the gallery container
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");

//make fetch request to API
async function displayEmployees() {
  const response = await fetch("https://randomuser.me/api/?results=12&?nat=us");
  const employees = await response.json();
  const employeesData = employees.results;
  console.log(employeesData);
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

  gallery.addEventListener("click", (event) => {
    const element = event.target;
    if (element.closest(".card") == null) {
      return;
    } else {
      const card = element.closest(".card");
      const employeeName = card.querySelector("#name").innerHTML.toLowerCase();
      //get the employee data
      employeesData.forEach(employee => {
        if(`${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}` == employeeName) {
          //create modal
          displayModal(employee);
          addCloseIcon();
        }
      })
    }
  })


  const displayModal = (employee) => {
      const image = employee.picture.large;
      const firstName = employee.name.first;
      const lastName = employee.name.last;
      const email = employee.email;
      const city = employee.location.city;
      const phone = employee.phone;
      const streetNumber = employee.location.street.number;
      const streetName = employee.location.street.name;
      const postcode = employee.location.postcode;
      const dateOfBirth = employee.dob.date.slice(0, 10).replace("-", "/").replace("-", "/");

      //create modal
      const popUp = document.createElement("div");
      popUp.classList.add("modal-container");
      //add html for modal
      popUp.innerHTML += `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${image}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${postcode}</p>
            <p class="modal-text">Birthday: ${dateOfBirth}</p>
        </div>
    </div>`;
       //add modal to the DOM
       body.insertAdjacentElement("beforeend", popUp);

  }


}

displayEmployees();

const addCloseIcon = () => {
  const closeIcon = document.getElementById("modal-close-btn");
  //add event listener to close icon to hide the modal
  closeIcon.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal-container");
    modal.remove();
  });
}


