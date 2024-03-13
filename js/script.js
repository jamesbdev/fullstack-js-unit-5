//get the gallery container
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");

//make fetch request to API
async function displayEmployees() {
  const response = await fetch("https://randomuser.me/api/?results=12&nat=us");
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

  //add click event listener to gallery
  //open a modal with employee information depending on the clicked element
  gallery.addEventListener("click", (event) => {
    const element = event.target;
    if (element.closest(".card") == null) {
      return;
    } else {
      const card = element.closest(".card");
      const employeeName = card.querySelector("#name").innerHTML.toLowerCase();

      //loop through employees
      employeesData.forEach((employee) => {
        //check if the employee name matches the employee name of the clicked element
        if (
          `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}` ==
          employeeName
        ) {
          //show modal with employee data
          displayModal(employee);
          //add closing icon functionality to the currently opened modal
          addCloseIcon();
        }
      });
    }
  });

  /* This function creates and displays a modal window that shows the employee data
It takes an employee object returned from the data as parameter
*/
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
    const dateOfBirth = employee.dob.date
      .slice(0, 10)
      .replace("-", "/")
      .replace("-", "/");

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
  };

  /* function that adds a search bar to the DOM 
   -ability to search for an employee in the gallery
  */
  const addSearch = () => {
    //get the employee cards
    const cards = document.querySelectorAll(".card");
    //get the parent container
    const searchContainer = document.querySelector(".search-container");
    //create the HTML for the search
    const searchHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;
    //insert search input in the container
    searchContainer.insertAdjacentHTML("afterbegin", searchHTML);
    //get the search input value
    const input = document.querySelector("#search-input");


    /* Function to display the searched employee
     */
    const searchEmployee = (event) => {
      //get the entered value
      const searchValue = event.target.value.toLowerCase();
      const employees = document.querySelectorAll("h3.card-name");
      
      employees.forEach(employee => {
        let employeeName = employee.innerText.toLowerCase();
          if(employeeName.includes(searchValue) || searchValue.trim() == "" ) {
            employee.parentNode.parentNode.style.display = "flex";
          } else {
            employee.parentNode.parentNode.style.display = "none";
          }
      })
    };
    //add event listener to input and listen for change
    input.addEventListener("keyup", searchEmployee);
  };

  addSearch();
}

displayEmployees();

/* This function adds a close icon in the currently opened modal. 
  When clicked it closes the modal
*/
const addCloseIcon = () => {
  const closeIcon = document.getElementById("modal-close-btn");
  //add event listener to close icon to hide the modal
  closeIcon.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal-container");
    modal.remove();
  });
};
