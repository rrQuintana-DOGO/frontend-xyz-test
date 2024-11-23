import CustomModal from "@components/display/CustomModal";
import Title from "@components/display/Title";
import TripLogsTable from "./components/TripLogsTable";
import { CustomButton } from "@components/inputs/CustomButton";

const TripLogModal = ({ open, handleClose = () => { }, id_trip }: { open: boolean, handleClose: () => void, id_trip: string }) => {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      size="large"
    >
      <div className="p-12 space-y-8">
        <Title label="Bitacora" size="2xl" />
        <TripLogsTable trip={id_trip} initialLimit={10} showPagination={true} />
        <div className="flex justify-end">
          <CustomButton
            label="Agregar registro"
            variant="text"
            size="medium"
          />
        </div>
      </div>
    </CustomModal>

  )
}

export default TripLogModal;