import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';
import { Typography } from '@mui/material';


export default function AlertDialog(props) {

  const history = useHistory();

  return (
    <div>
      <Dialog
        open={props.status}
        onClose={props.handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.error === "" ?
              <Typography component={'span'}>{props.successNoti}</Typography>
              :
              <Typography component={'span'} color={'error'}>{props.error} !! Please check again</Typography>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClickClose}>Cancel</Button>
          <Button onClick={props.handleClickClose,()=> 
            props.error === "" ?
            history.push('/login')
            :
            props.handleClickClose()
          } autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
