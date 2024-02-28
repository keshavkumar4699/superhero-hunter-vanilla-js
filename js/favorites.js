fav_array = localStorage.getItem("fav_array").split(","); //get favorites array containing ids of favorites

//fetch data for each element in favorites array
fav_array.forEach((element) => {
  fetch_data(element);
});

//function to fetch data with id from marvel API
async function fetch_data(id) {
  //fetch character from API with ID
  const data = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?apikey=9ab871748d83ae2eb5527ffd69e034de&hash=6a93db3efac6508992da22c6e5c65e04&ts=1708954934&limit=100&offset=0`
  )
    .then((res) => res.json()) //convert response to JSON format
    .then((data) => data.data.results[0]); //get results from JSON response

  set_data(data);
}

//function to set data based on data fetched from API of favorites 
function set_data(element) {
  const list = document.querySelector(".list");//select html tag where data is to be set

  //updating list with character's data
  list.innerHTML =
    list.innerHTML +
    `<div class="card text-bg-dark" id="${element.id}">
      <img src="${
        element.thumbnail.path + "." + element.thumbnail.extension
      }" class="card-img-top" alt="${element.name} image">
      <div class="card-body">
        <h6 class="card-title">${element.name}</h6>
        <p>
          ${element.description}
        </p>
        <div class="d-flex justify-content-between">
          <button onclick="redirect_detail('${
            element.id
          }')" class="btn btn-info">Know more...</button>
          <button onclick="mark_favorite('${
            element.id
          }')" class="fav-button btn btn-outline-danger" id="fav-${
      element.id
    }"><i class="fa-solid fa-heart"></i></button>
        </div>
      </div>
    </div>`;
}

//funtion to redirect to details page when button(know more...) is clicked of character
async function redirect_detail(id) {
  localStorage.setItem("details_id", id);
  window.location.href = "http://127.0.0.1:3000/details.html";
}

//function to mark favorite when favorites button is clicked and change appearanc of button
function mark_favorite(id) {
  const fav_btn = document.querySelector(`#fav-${id}`); //select fav button of selected character with given id

  // check if character is already present in favorites or not
  if (!fav_array.includes(id)) {
    //if not present add to favorites array and make heart solid
    fav_array.push(id);
    fav_btn.innerHTML = `<i class="fa-solid fa-heart">`;
  } else {
    //if present remove from favorites array and make heart regular
    const index = fav_array.indexOf(id);
    fav_array.splice(index, 1);
    fav_btn.innerHTML = `<i class="fa-regular fa-heart">`;
  }
  localStorage.setItem("fav_array", fav_array);
  // fav_array = (localStorage.getItem("fav_array")).split(",");
}