import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Coords, Place } from "@logic/interfaces/TripInterface";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import io from 'socket.io-client';
import 'leaflet.fullscreen';
import { useMap } from "react-leaflet";
import { envs } from "@config/envs";
interface LeafletRoutingMachineProps {
  places: Place[];
  waypoints: Coords[];
}

const LeafletRoutingMachine: React.FC<LeafletRoutingMachineProps> = ({ places, waypoints }) => {
  const map = useMap();
  const routingControlRef = useRef<ReturnType<typeof L.Routing.control> | null>(null);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  
  useEffect(() => {
    socketRef.current = io(envs.socketUrl, { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      console.log('Conectado al servidor WebSocket desde el mapa');
      
    });

    socketRef.current.on('location', (location) => {
      console.log('Location received:', location);
      const newWaypoint = L.latLng(location.latitude, location.longitude);
      setMarkerPosition(newWaypoint);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (markerPosition) {
      if (markerRef.current) {
        markerRef.current.setLatLng(markerPosition);
      } else {
        const customIcon = L.icon({
          iconUrl: '/marche.png',
          iconSize: [70, 40],
          iconAnchor: [12, 41]
        });

        markerRef.current = L.marker(markerPosition, { icon: customIcon }).addTo(map);
      }
    }
  }, [markerPosition, map]);

  useEffect(() => {
    if (routingControlRef.current) {
      try {
        routingControlRef.current.getPlan().setWaypoints([]);
        routingControlRef.current.spliceWaypoints(0, routingControlRef.current.getWaypoints().length);
        map.removeControl(routingControlRef.current);
      } catch (error) {
        console.error("Error clearing previous routing control:", error);
      } finally {
        routingControlRef.current = null;
      }
    }

    if (places.length > 1 || waypoints.length > 0) {
      const routeWaypoints = waypoints.length > 0
        ? waypoints.map(point => L.latLng(point.latitude, point.longitude))
        : [
          L.latLng(places[0].coords.latitude, places[0].coords.longitude),
          ...places.slice(1, -1).map(place => L.latLng(place.coords.latitude, place.coords.longitude)),
          L.latLng(places[places.length - 1].coords.latitude, places[places.length - 1].coords.longitude)
        ];

      routingControlRef.current = L.Routing.control({
        waypoints: routeWaypoints,
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: 'yellow', opacity: 0.6, weight: 10 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0
        },
        show: false,
        plan: L.Routing.plan(routeWaypoints, {
          createMarker: () => false, 
        }),
      }).addTo(map);
    }

    return () => {
      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.error("Error during cleanup:", error);
        } finally {
          routingControlRef.current = null;
        }
      }
    };
  }, [places, waypoints, map]);

  return null;
};

export default LeafletRoutingMachine;
