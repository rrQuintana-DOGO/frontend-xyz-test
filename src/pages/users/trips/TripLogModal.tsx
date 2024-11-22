import CustomModal from "@components/display/CustomModal";
import Title from "@components/display/Title";

const TripLogModal = ({ open, handleClose = () => { } }: { open: boolean, handleClose: () => void }) => {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      size="large"
    >
      <div className="p-12 space-y-8">
        <Title label="Bitacora" size="2xl" />
      </div>
    </CustomModal>

  )
}

export default TripLogModal;