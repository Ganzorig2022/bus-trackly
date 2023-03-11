import { MapContainer, TileLayer } from "react-leaflet"

const MapRender = ()=>{
    return(
        <MapContainer
          center={{ lat: 47.91660524732946, lng: 106.96457125140142 }}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BlX75aexttP0PZgDJuki"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          ></TileLayer>
        </MapContainer>
    )
}

export default MapRender;