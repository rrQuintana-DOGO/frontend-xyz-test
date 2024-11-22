import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Coords, Place } from '@logic/interfaces/TripInterface';
import CustomPin from './CustomPin';
import LeafletRoutingMachine from './LeafletRoutingMachine';
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";


const TripsCollapsibleMap = ({ places, middlePoint, waypoints }: { places: Place[], middlePoint: Coords, waypoints: Coords[] }) => {
  const position: [number, number] = [middlePoint?.latitude, middlePoint?.longitude]

  return (
    <MapContainer
      center={position || [0, 0]}
      zoom={13.5}
      scrollWheelZoom={false}
    >

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletRoutingMachine places={places} waypoints={waypoints} />
      <FullscreenControl  />
      {
        places.map((place) => (
          <CustomPin key={place.id_trips_has_places} data={place} />
        ))
      }
    </MapContainer>
  )
}

export default TripsCollapsibleMap;

