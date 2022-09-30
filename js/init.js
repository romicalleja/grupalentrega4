let apiURL = "https://japceibal.github.io/japflix_api/movies-data.json";
let allmoviesarray = [];
let moviesarray = [];
let btn = document.getElementById("btnBuscar");
let busq = document.getElementById("inputBuscar");

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
      allmoviesarray = resultObj.data;
    }
  });
});

// Muestra los detalles de las pelis

function movieInfo(movie) {
  let stars = "";
  let starsn = "";
  let generos = "";
  const releaseDate = new Date(movie.release_date || Date.now());
  let year = releaseDate.getFullYear();

  for (let s = 0; s < Math.round(movie.vote_average / 2); s++) {
    stars += `
            <p class="fa fa-star checked"></p>
            `;
  }

  for (let n = Math.round(movie.vote_average / 2); n < 5; n++) {
    starsn += `
            <p class="fa fa-star"></p>
            `;
  }
  let genres = movie.genres.length || [];

  for (let g = 0; g < genres; g++) {
    let genero = movie.genres[g];
    generos += `
      ${genero.name}
      `;
  }

  return {
    stars,
    starsn,
    generos,
    year,
    releaseDate,
  };
}

// evento para buscar y filtrar por el texto del input

function buscador(valorbusqueda) {
  let encontrados = [];
  let moviefind = {};
  let coleccion = {
    indice: [],
    title: [],
    genres: [],
    overview: [],
    tagline: [],
  };

  allmoviesarray.forEach((movie, index) => {
    coleccion.indice.push(index);
    coleccion.title.push(movie.title);
    coleccion.genres.push(movie.genres);
    coleccion.overview.push(movie.overview);
    coleccion.tagline.push(movie.tagline);
  });

  let valTitle = coleccion.title.map((title) => {
    const existe = byTitle(title, valorbusqueda);
    if (existe) {
      const titleVal = (movie) => movie.title == title;
      let findedTitle = allmoviesarray.find(titleVal);

      //  let peli = allmoviesarray.findIndex(indice);
      console.log(findedTitle);
      encontrados.push(findedTitle);
    }
    return existe;
  });
  console.log(valTitle);
  return encontrados;
}

btn.addEventListener("click", function (e) {
  let valorbusqueda = busq.value;

  let pelisEncontradas = buscador(valorbusqueda);
  cartelera(pelisEncontradas);
  console.log(pelisEncontradas);
});

function byTitle(title, valorbusqueda) {
  let peliencontrada = title
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    console.log("movie title:", peliencontrada);

    return peliencontrada;
  }
}
function byGenres(movie, valorbusqueda) {
  movie.genres.forEach((gen) => {
    let peliencontrada = gen.name
      .toLowerCase()
      .includes(valorbusqueda.toLowerCase());
    if (peliencontrada) {
      console.log("movie gen:", gen.name);
      return peliencontrada;
    }
  });
}
function byOverview(movie, valorbusqueda) {
  let peliencontrada = movie.overview
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    console.log("movie OV:", peliencontrada.overview);
    return peliencontrada;
  }
}
function byTagline(movie, valorbusqueda) {
  let peliencontrada = movie.tagline
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    console.log("movie TAG:", peliencontrada.tagline);
    return peliencontrada;
  }
}

/* let title = movie.title.toLowerCase().includes(valorbusqueda.toLowerCase());

  let genres = movie.genres.map((gen) =>
    gen.name.toLowerCase().includes(valorbusqueda.toLowerCase())
  );

  let overview = movie.overview
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());

  let tagline = movie.tagline
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());

  if (title || genres.length === 0 || overview || tagline) {
    return movie;
  }*/

// muestra las pelis en el html

function cartelera(movies) {
  let catalogo = "";

  movies.forEach((movie) => {
    const { stars, starsn, generos, year } = movieInfo(movie);

    catalogo += `
    <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" id="movie" >
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

    document.getElementById("lista").innerHTML = catalogo;
  });
}

//DISCARDED
// let movie = moviesarray[i];
// busqueda=busq.value
// let isVisible= movie.name.includes(busqueda) || movie.genres.includes(busqueda) || movie.tagline.includes(busqueda) || movie.overview.includes(busqueda)
// showmovies();
// document.getElementById("movie").classList.toggle("hide", !isVisible)

// })
// const name = movie.name.includes(busqueda)|| movie.genres.includes(busqueda) || movie.tagline.includes(busqueda)

//FUENTES
//https://blog.bitsrc.io/8-methods-to-search-javascript-arrays-fadbce8bea51
//https://flexiple.com/javascript/javascript-filter-array/
