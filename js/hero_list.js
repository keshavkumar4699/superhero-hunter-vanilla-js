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
          <a href="#" class="btn btn-outline-danger"><i class="fa-regular fa-heart"></i></a>
        </div>
      </div>
    </div>`;
  });
}

async function redirect_detail(id) {
  localStorage.setItem("details_id", id);
  window.location.href = "http://127.0.0.1:3000/details.html";
}

fetch_data();
