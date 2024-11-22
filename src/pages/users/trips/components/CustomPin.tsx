
import { Place } from "@logic/interfaces/TripInterface";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
const CustomPin = ({ data }: { data: Place }) => {

  return (
    <Marker
      position={[data.coords.latitude, data.coords.longitude]}
      icon={L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      })}

    >
      <Popup>
        {data.name}
      </Popup>
    </Marker>
  )
}

export default CustomPin