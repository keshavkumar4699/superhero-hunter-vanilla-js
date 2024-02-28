//function to fetch data with id from marvel API
async function fetch_data() {
  const response = await fetch(
    //fetch characters from API
    "https://gateway.marvel.com/v1/public/characters?apikey=9ab871748d83ae2eb5527ffd69e034de&hash=6a93db3efac6508992da22c6e5c65e04&ts=1708954934&limit=100&offset=0"
  );
  const data = await response.json(); //convert response to JSON format
  return data.data.results; //returns promise
}

//function to set data based on data fetched from API
function set_data(data) {
  const list = document.querySelector(".list"); //select html tag where data is to be set
  list.innerHTML = ""; //reset list of chracters

  //traverse each element in data array and check if it's present in favorites or not
  data.forEach((element) => {
    if (fav_array.includes(element.id.toString())) {
      //if present in favorites array then make heart solid
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
    } else {
      //if not present in favorites array then make heart regular
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
        }"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>`;
    }
  });
  return data;
}

//handle data promise and then setdata to html
fetch_data().then((data) => {
  set_data(data);
});

//for redirecting to details page
async function redirect_detail(id) {
  localStorage.setItem("details_id", id);
  window.location.href = "http://127.0.0.1:3000/details.html";
}

//to mark favorites
fav_array = localStorage.getItem("fav_array").split(",");

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

//for searching
let input = document.querySelector("#search");

//search for every key entered in input box
input.addEventListener("keyup", async function (e) {
  let data = await fetch_data(); //fetch whole data from api
  let searchString = e.target.value.toLowerCase();//convert search string to lowercase
  //filter data items based on keys entered
  let filterData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchString);
  });
  //set filtered data to page
  set_data(filterData);
});
