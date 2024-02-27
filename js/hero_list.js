async function fetch_data() {
  const response = await fetch(
    "https://gateway.marvel.com/v1/public/characters?apikey=9ab871748d83ae2eb5527ffd69e034de&hash=6a93db3efac6508992da22c6e5c65e04&ts=1708954934&limit=100&offset=0"
  );
  const data = await response.json();
  return data.data.results;
}

function set_data(data) {

  const list = document.querySelector(".list");
  list.innerHTML = '';

  data.forEach((element) => {
    if (fav_array.includes(element.id.toString())) {
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

fetch_data().then(data => {
  set_data(data);
});


//for redirecting to details page
async function redirect_detail(id) {
  localStorage.setItem("details_id", id);
  window.location.href = "http://127.0.0.1:3000/details.html";
}

//to mark favorites
fav_array = localStorage.getItem("fav_array").split(",");

function mark_favorite(id) {
  const fav_btn = document.querySelector(`#fav-${id}`);

  if (!fav_array.includes(id)) {
    fav_array.push(id);
    fav_btn.innerHTML = `<i class="fa-solid fa-heart">`;
  } else {
    const index = fav_array.indexOf(id);
    fav_array.splice(index, 1);
    fav_btn.innerHTML = `<i class="fa-regular fa-heart">`;
  }
  localStorage.setItem("fav_array", fav_array);
}

//for searching
let input = document.querySelector('#search');

input.addEventListener('keyup', async function(e){
  let data = await fetch_data();
  let searchString = e.target.value.toLowerCase();
  let filterData = data.filter(item => {
    return item.name.toLowerCase().includes(searchString);
  });
  set_data(filterData);
})