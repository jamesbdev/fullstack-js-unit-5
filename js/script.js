
//get the gallery container 
const gallery = document.querySelector("#gallery");

//make fetch request to API
async function logMovies() {
    const response = await fetch("https://randomuser.me/api/?results=12&?nat=us");
    const employees = await response.json();
    const employeesData = employees.results;

    const createCard = () => { 
        let html = "";
        employeesData.forEach(employee => {
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
        gallery.insertAdjacentHTML("beforeend", html)
    }
    createCard();
  }

  logMovies();

//display employee data

//create pop up modal

//add search functionality

//