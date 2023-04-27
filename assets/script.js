var placeInput = $('#place');
var searchButton = document.querySelector('#searchBtn');

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xndms2eWphMmpoYTNqbWticjVlcng1NyJ9.6Qgtg_xsE15r4ab7V1p2qg";

var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [0, 0],
  zoom: 2,
});

let input;


function getApi(place) {
    var geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=ip&access_token=pk.eyJ1IjoiZmVsaXh3aWxsZW0iLCJhIjoiY2xneWRxN2thMDhqeTNscGlxazZteDd3NSJ9.-h_-S4qFSy_pnbqneET0IA`
    fetch(geoCodingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
};

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    input = placeInput.val();
    getApi(input);
});
