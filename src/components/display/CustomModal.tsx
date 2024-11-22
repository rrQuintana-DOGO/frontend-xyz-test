import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const sizes = {
  small: 400,
  medium: 600,
  large: 800,
};

const style = (size: number) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: size,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  position: 'relative',
  maxHeight: '90vh',
  overflowY: 'auto',
});

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
  children,
  size = 'small',
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style(sizes[size])}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.primary',
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
