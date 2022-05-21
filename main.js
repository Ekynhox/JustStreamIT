const request = new Request('http://127.0.0.1:8000/api/v1/titles/?genre=war');

const URL = request.url;
const method = request.method;
const credentials = request.credentials;


result =  []

function generate_modal(id, data){
    const divModal = document.getElementById("myModal");
    divModal.innerHTML = `
    <!-- The Close Button -->
    <span class="close">&times;</span>
    <!-- Modal Content (The Image) -->
    <img class="modal-content" id="img01" src="${data.image_url}">
    <p class="resume">Titre: ${data.title}</p>
    <p class="resume">Année: ${data.year}</p>
    <p class="resume">Score IMDB: ${data.imdb_score}</p>
    <p class="resume">Réalisateur: ${data.directors}</p>
    <p class="resume">Acteurs: ${data.actors}</p>
    <p class="resume">Auteurs: ${data.writers}</p>
    <p class="resume">Genres: ${data.genres}</p>
    <!-- Modal Caption (Image Text) -->
    <div id="caption"></div>`;
    divModal.onclick = function(){
        divModal.style.display = "none";
    };
    return divModal;
}


const myDiv = document.getElementsByClassName("divOuter");

function generate_best_div(index, id, data){
    const divMovie = document.createElement("div");
    divMovie.id = id; 
    const imageId = "bestMovie"+index;
    divMovie.innerHTML = `
   <p class="titre_film">${data.title}</p>
    <button id="bestMovieButton">Play</button>
    <img src="${data.image_url}" alt="${data.title}" class="films" class = "myImg item" id="${imageId}">
    `;
    divMovie.onclick = function(){
        divModal = generate_modal(id, data);
        divModal.style.display = "block";
    };
    
    return divMovie;
}

async function generate_best_movie(){
    document.getElementById("main_movie").innerHTML = '';
    best_movie_jsondata1 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score',"best_rated");
    //best_movie_jsondata2 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score',"best_rated");
    best_movie_datas1 = best_movie_jsondata1.results[0];
    index = 1;
    divMovie1 = generate_best_div(index, "main_movie"+index, best_movie_datas1);
    document.getElementById("main_movie").appendChild(divMovie1);
    //gauche 
    
    const divMovie = document.createElement("div");
}

// fonction pour récupérer les films
async function fetch_movies(url, categorie) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

// catégorie best rated
async function generate_best_rated(begin, end){
    document.getElementById("best_rated").innerHTML = '';
    best_jsondata1 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score',"best_rated");
    best_jsondata2 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score',"best_rated");
    best_datas1 = best_jsondata1.results;
    best_datas2 = best_jsondata2.results.slice(0,2);
    best_datas = best_datas1.concat(best_datas2);
    best_datas_display = best_datas.slice(begin,end);
    best_datas_display.forEach((item, index) => {
        divMovie1 = generate_film_div(index, "film_best_rated"+index, item);
        document.getElementById("best_rated").appendChild(divMovie1);        
        })
}

// catégorie guerre
async function generate_guerre(begin, end){
    document.getElementById("guerre").innerHTML = '';
    g_jsondata= await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=war&page=1',"guerre");
    g_jsondata2 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=war&page=2',"guerre");
    g_datas1 = g_jsondata.results;
    g_datas2 = g_jsondata2.results.slice(0,2);
    g_datas = g_datas1.concat(g_datas2);
    g_datas_display = g_datas.slice(begin,end);
    g_datas_display.forEach((item, index) => {
        divMovie1 = generate_film_div(index, "filmGuerre"+index, item);
        document.getElementById("guerre").appendChild(divMovie1);        
        })
}

// catégorie animation
async function generate_animation(begin, end){
    document.getElementById("animation").innerHTML = '';
    animation_jsondata1 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=animation&page=1',"animation");
    animation_jsondata2 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=animation&page=2',"animation");
    animation_datas1 = animation_jsondata1.results;
    animation_datas2 = animation_jsondata2.results.slice(0,2);
    animation_datas = animation_datas1.concat(animation_datas2);
    animation_datas_display = animation_datas.slice(begin,end);
    animation_datas_display.forEach((item, index) => {
        divMovie1 = generate_film_div(index, "filmAnimation"+index, item);
        document.getElementById("animation").appendChild(divMovie1);     
        })
}

// catégorie drames
async function generate_drames(begin, end){
    document.getElementById("drames").innerHTML = '';
    drames_jsondata1 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=drama&page=1',"drames");
    drames_jsondata2 = await fetch_movies('http://127.0.0.1:8000/api/v1/titles/?genre=drama&page=2',"drames");
    drames_datas1 = drames_jsondata1.results;
    drames_datas2 = drames_jsondata2.results.slice(0,2);
    drames_datas = drames_datas1.concat(drames_datas2);
    drames_datas_display = drames_datas.slice(begin,end);
    drames_datas_display.forEach((item, index) => {
        divMovie1 = generate_film_div(index, "filmDrames"+index, item);
        document.getElementById("drames").appendChild(divMovie1);        
        })
}


//categorie meilleur film
generate_best_movie();
//end categorie meilleur film

//categorie best_rated
var begin_best_rated = 0;
var end_best_rated = 4; 
generate_best_rated(begin_best_rated,end_best_rated);
btn_preview_best_rated = document.getElementById("preview_best_rated");
btn_preview_best_rated.onclick = function(){
    if(begin_best_rated > 0){
        begin_best_rated--;
        end_best_rated--;
        generate_best_rated(begin_best_rated,end_best_rated);
    }
};
btn_next_best_rated = document.getElementById("next_best_rated");
btn_next_best_rated.onclick = function(){
    if(end_best_rated < 7){
        begin_best_rated++;
        end_best_rated++;
        generate_best_rated(begin_best_rated,end_best_rated);
    }
 };
// end categorie best_rated

//categorie guerre
var begin_guerre = 0;
var end_guerre = 4; 
generate_guerre(begin_guerre,end_guerre);
btn_preview_guerre = document.getElementById("preview_guerre");
btn_preview_guerre.onclick = function(){
    if(begin_guerre > 0){
        begin_guerre--;
        end_guerre--;
        generate_guerre(begin_guerre,end_guerre);
    }
};
btn_next_guerre = document.getElementById("next_guerre");
btn_next_guerre.onclick = function(){
    if(end_guerre < 7){
        begin_guerre++;
        end_guerre++;
        generate_guerre(begin_guerre,end_guerre);
    }
 };
// end categorie guerre

//categorie animation
var begin_animation = 0;
var end_animation = 4; 
generate_animation(begin_animation,end_animation);
btn_preview_animation = document.getElementById("preview_animation");
btn_preview_animation.onclick = function(){
    if(begin_animation > 0){
        begin_animation--;
        end_animation--;
        generate_animation(begin_animation,end_animation);
    }
};
btn_next_animation = document.getElementById("next_animation");
btn_next_animation.onclick = function(){
    if(end_animation < 7){
        begin_animation++;
        end_animation++;
        generate_animation(begin_animation,end_animation);
    }
 };
// end categorie animation

//categorie drames
var begin_drames = 0;
var end_drames = 4; 
generate_drames(begin_drames,end_drames);
btn_preview_drames = document.getElementById("preview_drames");
btn_preview_drames.onclick = function(){
    if(begin_drames > 0){
        begin_drames--;
        end_drames--;
        generate_drames(begin_drames,end_drames);
    }
};
btn_next_drames = document.getElementById("next_drames");
btn_next_drames.onclick = function(){
    if(end_drames < 7){
        begin_drames++;
        end_drames++;
        generate_drames(begin_drames,end_drames);
    }
 };
// end categorie drames

function generate_film_div(index, id, data){
 
    const divMovie = document.createElement("li");
    divMovie.id = id;
    divMovie.className = "splide__slide film";
    const imageId = "myImg"+index;
    divMovie.innerHTML = `
    ${data.title}
    <img src="${data.image_url}" alt="${data.title}" class="films" class = "myImg" id="${imageId}">`;  
    divMovie.onclick = function(){
        divModal = generate_modal(id, data);
        divModal.style.display = "block";
    };
  
    return divMovie;
}

var modal = document.getElementById("myModal");