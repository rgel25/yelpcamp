mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: coords.split(","), // starting position [lng, lat]
  zoom: 9, // starting zoom
  projection: "globe", // display the map as a 3D globe
});
map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

new mapboxgl.Marker()
  .setLngLat(coords.split(","))
  .setPopup(
    new mapboxgl.Popup({ offset: 10 }).setHTML(
      `<h3>${title}</h3><p>${position}</p>`
    )
  )
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
