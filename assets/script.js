mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xndms2eWphMmpoYTNqbWticjVlcng1NyJ9.6Qgtg_xsE15r4ab7V1p2qg";

var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [0, 0],
  zoom: 2,
});
