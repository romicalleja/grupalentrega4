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

  // movie.genres
  //   .filter((fil) => fil.id != undefined)
  //   .forEach((gen) => {
  //     generos += `
  //    ${gen.name}
  //     `;
  //  });
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
      // console.log(findedTitle);
      encontrados.push(findedTitle);
      // return findedTitle;
    }
  });

  /*let valGenre = coleccion.genres.map((genres) => {
    const existe = byGenres(genres, valorbusqueda);
    console.log("asdasd", existe)
    if (existe[0]) {
      const genVal = (movie) => movie.genres.name == valorbusqueda;
      let findedGens = allmoviesarray.find(genVal);
      
      //  let peli = allmoviesarray.findIndex(indice);
      console.log(findedGens);
      return findedGens;
    }
  });
  encontrados.push(valGenre);
*/
  let valTagline = coleccion.tagline.map((tagline) => {
    const existe = byTagline(tagline, valorbusqueda);
    if (existe) {
      const taglineVal = (movie) => movie.tagline == tagline;
      let findedTag = allmoviesarray.find(taglineVal);

      //  let peli = allmoviesarray.findIndex(indice);
      // console.log(findedTag);
      encontrados.push(findedTag);
      //   return findedTag;
    }
  });

  let valOverview = coleccion.overview.map((overview) => {
    const existe = byOverview(overview, valorbusqueda);
    if (existe) {
      const overVal = (movie) => movie.overview == overview;
      let findedOver = allmoviesarray.find(overVal);

      //  let peli = allmoviesarray.findIndex(indice);
      // console.log(findedOver);
      encontrados.push(findedOver);

      // return findedTitle;
    }
  });

  return encontrados;
}

btn.addEventListener("click", function (e) {
  if (busq.value.length> 0){
  let valorbusqueda = busq.value;

  let pelisEncontradas = buscador(valorbusqueda);
  cartelera(pelisEncontradas);
  // console.log(pelisEncontradas);
  }
});

function byTitle(title, valorbusqueda) {
  let peliencontrada = title
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    // console.log("movie title:", peliencontrada);

    return peliencontrada;
  }
}
function byGenres(gens, valorbusqueda) {
  let genExist = gens.map((gen) => {
    let genEncontrado = gen.name
      .toLowerCase()
      .includes(valorbusqueda.toLowerCase());
    if (genEncontrado) {
      // console.log("movie gen:", genEncontrado);
      return genEncontrado;
    }
  });
  return genExist.filter((gen) => gen == true);
}

function byOverview(overview, valorbusqueda) {
  let peliencontrada = overview
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    // console.log("movie OV:", peliencontrada);
    return peliencontrada;
  }
}
function byTagline(tagline, valorbusqueda) {
  let peliencontrada = tagline
    .toLowerCase()
    .includes(valorbusqueda.toLowerCase());
  if (peliencontrada) {
    // console.log("movie TAG:", peliencontrada);
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
    // console.log(movie);
    if (!movie) {
      console.log("noesmovie", movie);
      return;
    }
    const { stars, starsn, generos, year } = movieInfo(movie);

    catalogo += `
    <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" id="movie">
    <h4>${movie.title}</h4>
    <p>${movie.tagline}${stars + starsn}</p>
    </div>
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
${movie.overview}<hr></hr> 
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
    `;

    document.getElementById("lista").innerHTML = catalogo;
  })
}
