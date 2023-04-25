import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import {useContext } from 'react';
import UserContext from "../context/user/UserContext";

function Toast() {
 
  const { error, dispatch,errorMessage } = useContext(UserContext)
  return (
      <Snackbar severity="error" open={error} 
      
      anchorOrigin= {{vertical:'top', horizontal :'center'}}>
      <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               dispatch({type: 'C_ERROR', payload: ""})
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
  )
}
export default Toast