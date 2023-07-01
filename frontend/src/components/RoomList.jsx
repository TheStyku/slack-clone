import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UserContext from "../context/user/UserContext";
import { useState,useContext } from "react";
import axios from "axios";

function RoomList({socket}) {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [room, setRoom] = useState('')
  const {dispatch,token} = useContext(UserContext);

  const API_URL = "http://localhost:4000/api/message/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      room: room
    }
  };
  const getMessage = async (e) => {
    await axios
      .get(
        API_URL,         
        config
      )
      .then((response) => {
        console.log(response.data);
        dispatch({type:'CLEAR_MESSAGE'})
        response.data.forEach(item=> 
          dispatch({type:'ADD_MESSAGE', payload:{ id: item._id, text: item.text, name: item.user.name}})
          )
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleChange =(e) =>{
    setRoom(e.target.value)
  }

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const handleSubmit = () => {
    dispatch({type: 'SET_ROOM', payload: {room}})
    console.log({room})
    setOpen2(false);
    getMessage();
  };

  
  return (
   <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#303E4D",
          color: "#bdbdbd",
        }}
        dense
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick} >
          <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}  >
            <ArrowRightIcon  color="grey" />
          </ListItemIcon>
          <ListItemText
            primary="Channels "
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit >
          <List component="div" disablePadding dense>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <TagIcon color="grey" />
              </ListItemIcon>
              <ListItemText
                primary="general"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
            </ListItemButton>
            <ListItemButton onClick={handleClickOpen } sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <AddIcon color="grey" />
              </ListItemIcon>
              <ListItemText
                primary="Add channels"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
            <ArrowRightIcon color="grey" />
          </ListItemIcon>
          <ListItemText primary="Direct messages " />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense> 
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <TagIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="You" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <AddIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="Add teammates" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Dialog open={open2} onClose={handleClose} maxWidth='xs' fullWidth={true}>
        <DialogTitle>Create a channel</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
          Channels are where your team communicates. 
          They’re best when organized around a topic — #marketing, for example.
          </DialogContentText >
          <DialogContentText  variant="subtitle1">
            Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="room"
            value={room}
            onChange={handleChange}
           
            fullWidth
            variant="outlined"
          />
           <DialogContentText variant="subtitle1" >
           Description 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            
            
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color='success'>Create</Button>
        </DialogActions>
      </Dialog>
      </>
    
  );
}
export default RoomList;
