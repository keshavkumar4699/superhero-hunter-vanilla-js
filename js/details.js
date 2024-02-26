async function fetch_detail() {
  const id = localStorage.getItem("details_id");
  const data = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?apikey=9ab871748d83ae2eb5527ffd69e034de&hash=6a93db3efac6508992da22c6e5c65e04&ts=1708954934&limit=100&offset=0`
  )
    .then((res) => res.json())
    .then((data) => data.data.results);

  console.log(data);
  set_details(data);
}

function set_details(data) {
  const details = document.querySelector(".details");
  data.forEach((element) => {
    details.innerHTML = `<div class="row g-0">
        <div class="col-md-4">
          <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="img-fluid rounded-start" alt="super-hero image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p><small class="card-text">ID: ${element.id}</small></p>
            <p><small class="card-text">Series: ${element.comics.available}</small></p>
            <p><small class="card-text">Stories: ${element.series.available}</small></p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h6 class="card-title">Description</h6>
        <p class="card-text">${element.description}</p>
      </div>`;
  });
}

fetch_detail();
