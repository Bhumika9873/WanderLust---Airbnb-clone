console.log(typeof listing);
console.log("listing =", listing);
console.log("geometry =", listing.geometry);
console.log("coordinates =", listing.geometry.coordinates);
console.log("isArray =", Array.isArray(listing.geometry.coordinates));
console.log("length =", listing.geometry.coordinates.length);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  center: listing.geometry.coordinates,
  zoom: 9,
});

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4>
       <p>Exact location will be provided after booking</p>`
    )
  )
  .addTo(map);