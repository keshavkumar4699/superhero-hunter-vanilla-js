async function fetch_data() {
  const data = await fetch(
    "https://gateway.marvel.com/v1/public/characters?apikey=9ab871748d83ae2eb5527ffd69e034de&hash=6a93db3efac6508992da22c6e5c65e04&ts=1708954934&limit=100&offset=0"
  )
    .then((res) => res.json())
    .then((data) => data.data.results);
  set_data(data);
}

function set_data(data) {
  const list = document.querySelector(".list");

  data.forEach((element) => {
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
          }')" class="fav-button btn btn-outline-danger" id="fav-${element.id}"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>`;
  });
}

async function redirect_detail(id) {
  localStorage.setItem("details_id", id);
  window.location.href = "http://127.0.0.1:3000/details.html";
}

// function mark_favorite(id) {
//   // localStorage.clear();
//   // return;
//   let fav_array = [];
//   const retrievedArrayString = localStorage.getItem("favArray");
//   console.log(JSON.parse(retrievedArrayString));

//   if (retrievedArrayString != null) {
//     var favorites = JSON.parse(retrievedArrayString);
//     if (typeof favorites == "number") {
//       fav_array.push(favorites);
//     } else {
//       console.log(fav_array);
//       fav_array = favorites;
//     }
//   }

//   let index = fav_array.indexOf(id);
//   const fav_btn = document.querySelector(".fav-button");

//   if (index != -1) {
//     fav_array.splice(index, 1);
//     fav_btn.innerHTML = `<i class="fa-regular fa-heart">`;
//   } else {
//     fav_array.push(id.toString());
//     // localStorage.setItem(`fav_${id}`, id);
//     fav_btn.innerHTML = `<i class="fa-solid fa-heart">`;
//   }

//   localStorage.setItem("favArray", fav_array);
// }

let fav_array = [];

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
  // fav_array = (localStorage.getItem("fav_array")).split(",");
}

fetch_data();
