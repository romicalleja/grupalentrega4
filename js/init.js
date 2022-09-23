let apiURL = "https://japceibal.github.io/japflix_api/movies-data.json";
let moviesarray = [];
let btn = document.getElementById("btnBuscar");
let busq=document.getElementById("inputBuscar");

function getJSONData(url) {
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(apiURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      moviesarray = resultObj.data;
      showmovies();
    }
  });
});

function showmovies() {
  let movies = "";
  for (let i = 0; i < moviesarray.length; i++) {
    let movie = moviesarray[i];
    let stars = "";
    let starsn = "";
    let generos = "";
    const d = new Date(movie.release_date);
    let year = d.getFullYear();
    for (let s = 0; s < movie.vote_average; s++) {
      stars += `
            <p class="fa fa-star checked"></p>
            `;
    }
    for (let n = movie.vote_average; n < 10; n++) {
      starsn += `
            <p class="fa fa-star"></p>
            `;
    }
    for (let g = 0; g < movie.genres.length; g++) {
      console.log(movie.genres);
      let genero = movie.genres[g];
      generos += `
      ${genero.name}
      `;
    }
    // console.log(movie.genres)

    movies += `

<div data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" >
<h4>${movie.title}</h4>
<p>${movie.tagline}${stars + starsn}</p>
</div>
<div>
<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
<div class="offcanvas-header">
  <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
  ${movie.overview}
   <hr></hr> 
  <p>${generos}</p>
   </div>
<div class="dropdown" >
  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">more</button>
<ul class="dropdown-menu >
  <li><a class="dropdown-item">year:${year}</a></li>
  <li><a class="dropdown-item">runtime:${movie.runtime}</a></li>
  <li><a class="dropdown-item">budget:${movie.budget}</a></li>
  <li><a class="dropdown-item">revenue:${movie.revenue}</a></li>
</ul>
</div>
</div>
</div>
`;
    document.getElementById("lista").innerHTML = movies;
  }
}