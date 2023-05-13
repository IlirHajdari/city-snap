var placeInput = $("#place");
var homeBtn = document.querySelector('#homeBtn');
var searchButton = document.querySelector("#searchBtn");
var imgEl = document.createElement("img");
var h1El = document.createElement("h1");
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xndms2eWphMmpoYTNqbWticjVlcng1NyJ9.6Qgtg_xsE15r4ab7V1p2qg";
var cityHist = document.getElementById('userCities'); 
var searchData = [];

//Mapbox map API, gets the globe UI #1
let map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [00, 00],
  zoom: 1,
});

let input;
let coordinates;
let popup;
let zoom;

//Mapbox Geolocation API, gets the coordinates #3
function getApi(place) {
  var geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=ip&access_token=pk.eyJ1IjoiZmVsaXh3aWxsZW0iLCJhIjoiY2xneWRxN2thMDhqeTNscGlxazZteDd3NSJ9.-h_-S4qFSy_pnbqneET0IA`;
  fetch(geoCodingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      coordinates = data.features[0].geometry.coordinates;
      searchPLace();

      var bbox = data.features[0].bbox;
      map.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    });
}

//Google search API, gets the pictures #4
function getSearchApi(input) {``
  var key = "AIzaSyCldIOTfefzKCP9ENRj4kuTnQ_XHEyfwxc";
  var googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=46d2cf46487a44022&q=${input}&searchType=image`;

  fetch(googleSearchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayPopup(data);
    });
}

//Creates cards on the queries searched #6
function displayPopup(data) {
  if (popup) popup.remove();

  popup = new mapboxgl.Popup({ closeOnClick: false })
    .setHTML("<h1>" + input + "</h1>")
    .setLngLat(coordinates)
    .addTo(map);
  var popUpContent = document.querySelector(".mapboxgl-popup-content");
  imgEl.setAttribute("src", data.items[0].link);
  popUpContent.appendChild(imgEl);
  popUpContent.setAttribute('style', 'background-color: white; border-radius: 8px; text-align: center; padding: 5px; fontFamily: Liberation-Mono')
  imgEl.setAttribute('style', 'border-radius: 5px')
}


//jumps to specified coordinates #5
function searchPLace() {
  map.jumpTo({ center: coordinates });
}

// First, user inputs a search, runs both Geolocation and search API #2
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  input = placeInput.val();
  getSearchApi(input);
  getApi(input);
  storeData(input)
});

//Home button for the user to click to zoom out #8
homeBtn.addEventListener('click', function(event) {
  event.preventDefault();
  map = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [00, 00],
    zoom: 1,
  })
})

function retrieveData() {
  var getData = JSON.parse(localStorage.getItem('searchData'));
  console.log(getData);

  for (var i = 0; i < getData.length; i++) {
    var oldCities = document.createElement("button");
    oldCities.innerHTML = getData[i];
    oldCities.setAttribute('style', 'background-color: #E8F0FE; border-radius: 12px; min-width: 60%; position: absolute; left: 20%; height: 30px');
    cityHist.appendChild(oldCities);
    oldCities.addEventListener("click", function () {
      // input = this.textContent;
    });
  }
}

//localstorage #7
function storeData(input) {
   searchData.push(input);
   console.log(searchData);
   localStorage.setItem('searchData', JSON.stringify(searchData));
   var cities = document.createElement("button");
   cities.setAttribute('style', 'background-color: #E8F0FE; border-radius: 12px; min-width: 60%; position: absolute; left: 20%; height: 30px');
   cities.innerHTML = input;
   cityHist.appendChild(cities);
}


