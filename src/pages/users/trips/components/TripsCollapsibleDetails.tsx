/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coords, Place } from "@logic/interfaces/TripInterface";
import TripsCollapsibleDetailsStepper from "./TripsCollapsibleDetailsStepper";
import TripsCollapsibleMap from "./TripsCollapsibleMap";
import SectionTripDetails from "./SectionTripDetails";
import TripDetailRow from "./TripDetailRow";
import Divider from '@mui/material/Divider';
import CustomModal from "@components/display/CustomModal";
import { useState } from "react";
import Title from "@components/display/Title";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CustomButton } from "@components/inputs/CustomButton";
import TripLogModal from "../TripLogModal";
import TripLogsTable from "./TripLogsTable";
import NewTripModal from "./form/NewTripModal";
import { transformToInitialValues } from "./form/tripsFormik";

interface RowDetails {
  id_trip: string;
  places: Place[];
  description: string;
  tripType: string
  journeyType: string
  carrier: string;
  unit: string;
  middlePoint: Coords;
  drivers: { name: string }[];
  waypoints: Coords[];
  routeName: string;
  wayBill: string;
  data: any;
}

const TripsCollapsibleDetails = ({ row }: { row: RowDetails }) => {
  let placesDataStepper = [];

  if (row.places.length > 3) {

    placesDataStepper.push(row.places[0]);

    let intermediateObject = {
      icon: String(row.places.length - 2),
      name: "Puntos intermedios",
      isMiddle: true,
      coords: {
        latitude: row.middlePoint.latitude,
        longitude: row.middlePoint.longitude
      }
    }

    placesDataStepper.push(intermediateObject);

    placesDataStepper.push(row.places[row.places.length - 1]);

  } else {
    placesDataStepper = row.places;
  }

  const placesModal = [
    row.places[0],
    row.places[row.places.length - 1]
  ]

  const [newTriMapModal, setNewTripMapModal] = useState(false);
  const [newTripAllModal, setNewTripAllModal] = useState(false);
  const [newTripLogModal, setNewTripLogModal] = useState(false);

  const handleMapOpen = () => setNewTripMapModal(true);
  const handleMapClose = () => setNewTripMapModal(false);

  const handleTripAllOpen = () => setNewTripAllModal(true);
  const handleTripAllClose = () => setNewTripAllModal(false);

  const handleTripLogOpen = () => setNewTripLogModal(true);
  const handleTripLogClose = () => setNewTripLogModal(false);

  const [editTripModal, setEditTripModal] = useState(false);
  const handleClose = () => setEditTripModal(false);

  return (
    <>
      <div className="space-y-4 bg-[#F1F4FA] p-6 space-y-8">
        <div className=" flex items-end justify-end space-x-12">
          <CustomButton
            label="Cancelar viaje"
            variant="text"
            size="medium"
          />
          <CustomButton
            label="Reprogramar"
            variant="text"
            size="medium"
          />
          <CustomButton
            label="Terminar viaje"
            variant="text"
            size="medium"
          />
        </div>
        <div className='flex flex-row space-x-3'>
          <SectionTripDetails
            buttonLabel="Editar"
            cols={1}
            gap={1}
            click={() => {
              console.log('🥳', row.data)
              setEditTripModal(true)
            }}
            //click={() => console.log('🥳', transformToInitialValues(row.data))}
          >
            <TripsCollapsibleDetailsStepper places={placesDataStepper} seeAll={() => handleTripAllOpen()} />
            { placesDataStepper.length > 0 &&
              <div className="my-4">
                <CustomButton
                  variant="text"
                  label="Ver mapa"
                  size="small"
                  onClick={handleMapOpen}
                  sx={{
                    paddingLeft: 0
                  }}
                  icon={<AddCircleOutlineIcon />}
                />
              </div>
          }
          </SectionTripDetails>
          <div className="flex-1">
            <SectionTripDetails
              label="Bitácora"
              buttonLabel="Ver todo"
              cols={1}
              gap={1}
              click={() => handleTripLogOpen()}
            >
              <TripLogsTable trip={row.id_trip} initialLimit={4} />
            </SectionTripDetails>
          </div>
        </div>

        <Divider orientation="horizontal" />

        <div className='flex flex-row space-x-4'>

          <SectionTripDetails
            label="Detalle del viaje"
            buttonLabel="Editar"
            cols={3}
            gap={4}
            click={() => alert("🥳")}
          >
            <TripDetailRow label="Tipo de viaje" value={row.tripType} />
            <TripDetailRow label="Tipo de carga" value={row.journeyType} />
            <TripDetailRow label="Tipo de recorrido" value={row.routeName} />
            <TripDetailRow label="Cartaporte">
              <CustomButton
                variant="text"
                label="Ver archivo"
                size="small"
                onClick={() => window.open(row.wayBill, "_blank")}
                sx={{
                  paddingLeft: 0
                }}
              />
            </TripDetailRow>
            <TripDetailRow label="Descripción" value={row.description} />
          </SectionTripDetails>


          <SectionTripDetails
            label="Asignación"
            buttonLabel="Editar"
            cols={3}
            gap={4}
            click={() => alert("🥳")}
          >
            <TripDetailRow label="Linea transportista" value={row.carrier} />
            <TripDetailRow label="Unidad" value={row.unit || "Sin unidad asignada"} />
            {
              row.drivers.length > 0 &&
              row.drivers.map((driver, index) => (
                <TripDetailRow key={index} label={`Operador ${index + 1}`} value={driver.name} />
              ))
            }
          </SectionTripDetails>

        </div>

        {/* Modal para mostrar mapa */}
        <CustomModal
          open={newTriMapModal}
          handleClose={handleMapClose}
          size="large"
        >
          <div className="p-8 space-y-8">
            <Title label="Ruta" size="2xl" />
            <TripsCollapsibleMap places={row.places} middlePoint={row.middlePoint} waypoints={row.waypoints} />
            <SectionTripDetails
              label="Puntos de la ruta"
              buttonLabel="Editar"
              cols={1}
              gap={1}
              click={() => alert("🥳")}
            >
              <TripsCollapsibleDetailsStepper places={placesModal} />
            </SectionTripDetails>
          </div>
        </CustomModal>

        {/* Modal para mostrar todos los lugares */}
        <CustomModal
          open={newTripAllModal}
          handleClose={handleTripAllClose}
          size="large"
        >
          <div className="p-12 space-y-8">
            <Title label="Puntos" size="2xl" />
            <TripsCollapsibleDetailsStepper places={row.places} />
          </div>
        </CustomModal>

        {/* Modal para mostrar mapa */}
        <TripLogModal
          open={newTripLogModal}
          id_trip={row.id_trip}
          handleClose={handleTripLogClose}
        />
      </div>
      <CustomModal
        open={editTripModal}
        handleClose={handleClose}
        size="large"
      >
        <NewTripModal editing existingTripValues={transformToInitialValues(row.data)} handleClose={handleClose} />
      </CustomModal>
    </>
  )
}

export default TripsCollapsibleDetails;
