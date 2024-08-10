import React from "react";
import * as L from "leaflet"
import marker from './Pages/Egents/map marker.png';
import shadow from './Pages/Egents/marker-shadow.png';
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import NeshanMapContact from "./Pages/Egents/map/NeshanMap";

const Map = () => {
    var redMarker = L.icon({
        iconUrl: marker,
        shadowUrl: shadow,
        iconSize:     [25, 35], // size of the icon
        shadowSize:   [25, 30], // size of the shadow
        iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 25],  // the same for the shadow
        popupAnchor:  [3, -32] // point from which the popup should open relative to the iconAnchor
    });
    return (
        <section>
      <NeshanMapContact
          options={{
            key: "web.190d1e6563104d71873a7eb749cc2d2d",
            maptype: "neshan",
            poi: true,
            traffic: false,
            center: [32.166825, 54.083029],
            zoom: 12,
          }}
          onInit={(L, myMap) => {
            L.marker([32.166825, 54.083029], {
            icon: redMarker,
              fillOpacity: 0.5,
              radius: 500,
            }).addTo(myMap)
            .bindPopup(`<div class="flex-fix"><b>کاشی و سرامیک ستاره میبد</b>میبد</div>`)
          }}
        />
      </section>)
}

export default Map