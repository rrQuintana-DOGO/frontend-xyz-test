/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const createSnackbarContainer = () => {
  const snackbarContainer = document.createElement('div');
  document.body.appendChild(snackbarContainer);
  return snackbarContainer;
};

const Transition = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const showNotification = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  const snackbarContainer = createSnackbarContainer();

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(snackbarContainer);
    document.body.removeChild(snackbarContainer);
  };

  ReactDOM.render(
    <Snackbar 
      open 
      autoHideDuration={8000} 
      onClose={handleClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      TransitionComponent={Transition}
    >
      <Alert 
        sx={{ 
          width: '400px', 
          backgroundColor: 'white',
          borderTop: `4px solid ${getSeverityColor(type)}`,
          flexDirection: 'column',
          position: 'relative',
          shadow: 14,
        }}
      >
        <IconButton 
          size="small" 
          onClick={handleClose} 
          sx={{ 
            position: 'absolute', 
            right: 8, 
            top: 8, 
            color: getSeverityColor(type),
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <strong>{title}</strong><br />
        <span>{message}</span>
      </Alert>
    </Snackbar>,
    snackbarContainer
  );
};

const getSeverityColor = (type: 'success' | 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'success':
      return '#6DCCB1';
    case 'error':
      return '#f44336';
    case 'warning':
      return '#ff9800';
    case 'info':
      return '#2196f3';
    default:
      return '#2196f3'; // Azul por defecto
  }
};
