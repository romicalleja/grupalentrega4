let apiURL= "https://japceibal.github.io/japflix_api/movies-data.json"
let moviesarray=[]
let btn = document.getElementById("btnBuscar")

function getJSONData (url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(apiURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          moviesarray = resultObj.data;
          console.log(resultObj.data);
        }})})


btn.addEventListener("click", function(e){
   let HTMLcontenttoappend= ""
   for (let i = 0; i < moviesarray.length; i++) {
        let movie = moviesarray[i];
        console.log(movie.title)
HTMLcontenttoappend+=`
<div>
<p>${movie.title}</p>
</div>
`;
document.getElementById("lista").innerHTML=HTMLcontenttoappend
}})