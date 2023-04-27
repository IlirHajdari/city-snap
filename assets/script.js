mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xndms2eWphMmpoYTNqbWticjVlcng1NyJ9.6Qgtg_xsE15r4ab7V1p2qg";
const map = new mapboxgl.Map({
  container: "mapContainer", // HTML container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: [],
  zoom: 2.5,
});
