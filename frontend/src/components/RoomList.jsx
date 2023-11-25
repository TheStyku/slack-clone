import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MessageIcon from "@mui/icons-material/Message";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import UserContext from "../context/user/UserContext";
import { useState, useContext, Fragment } from "react";
import axios from "axios";
import { ListItem } from "@mui/material";

function RoomList({ socket }) {
  const [openChanels, setOpenChanels] = useState(true);
  const [openDirectMessage, setOpenDirectMessage] = useState(true);
  const [openAddChannels, setOpenAddChannels] = useState(false);
  const [openAddDirectMessage, setAddDirectMessage] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState();
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPasword] = useState("");
  const { dispatch, token, activeRooms, email, roomsList, _id } =
    useContext(UserContext);
  const [chan, setChan] = useState(["general"]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [temp, setTemp] = useState();

  const API_URL = process.env.REACT_APP_TITLE + "/api/message/";
  const API_URL2 = process.env.REACT_APP_TITLE + "/api/room/";
  const API_URL3 = process.env.REACT_APP_TITLE + "/api/users/search";
  const API_URL_UPDATE = process.env.REACT_APP_TITLE + "/api/users/update";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getMessage = async (name) => {
    await axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          room: name,
        },
      })
      .then((response) => {
        dispatch({ type: "CLEAR_MESSAGE" });
        response.data.forEach((item) =>
          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: item._id,
              text: item.text,
              name: item.user.name,
              date: item.date,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const updateActiveRooms = async (n) => {
    await axios
      .patch(API_URL_UPDATE, { _id: _id, activeRooms: n })
      .then((response) => {
        console.log(response.data);
      });
  };

  const searchUser = async (e) => {
    await axios
      .get(API_URL3, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          name: name,
        },
      })
      .then((response) => {
        setUsers([]);
        setErrorOpen(false);
        response.data.forEach((item) => {
          setUsers((arr) => [...arr, { name: item.name, email: item.email }]);
        });
      })
      .catch((err) => {
        setUsers([]);
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setErrorOpen(true);
      });
  };

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const hadletry = async (e) => {
    await axios
      .post(
        API_URL2,
        {
          name: room,
          description: description,
          password: password,
          email: email,
        },
        config
      )
      .then((response) => {
        dispatch({ type: "SET_ROOM", payload: { room } });
        setChan([...chan, room]);
        dispatch({ type: "ADD_ROOM_LIST", payload: { roomsList: room } });
        if (!activeRooms.includes(room)) {
          dispatch({ type: "AddActiveRooms", payload: { activeRooms: room } });
          setTemp(activeRooms);
          const filtered = temp.filter((t) => t !== name);
          setTemp(filtered);
          updateActiveRooms(temp);
        }
        setOpenAddChannels(false);
        getMessage(room);
        setRoom("");
        setPasword("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.message);
        setErrorOpen(true);
      });
  };

  const handleOpenChanels = () => {
    setOpenChanels(!openChanels);
  };
  const handleDirectMessage = () => {
    setOpenDirectMessage(!openDirectMessage);
  };

  const handleOpenAddChannels = () => {
    setOpenAddChannels(true);
  };

  const handleCloseAddChannels = () => {
    setOpenAddChannels(false);
  };

  const handleOpenAddDirectMessage = () => {
    setAddDirectMessage(true);
  };

  const handleCloseAddDirectMessage = () => {
    setAddDirectMessage(false);
  };

  const channelClick = (name) => {
    getMessage(name);
    if (!activeRooms.includes(name)) {
      dispatch({ type: "AddActiveRooms", payload: { activeRooms: name } });
      updateActiveRooms(name);
    }
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
        <ListItemButton onClick={handleOpenChanels}>
          <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
            <ArrowRightIcon color="grey" />
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
          {openChanels ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openChanels} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            dense
            sx={{ maxHeight: "20rem", overflow: "auto" }}
          >
            {roomsList.map((cha, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={(e) => channelClick(roomsList[index])}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
                    <TagIcon color="grey" />
                  </ListItemIcon>
                  <ListItemText
                    primary={roomsList[index]}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem>
              <ListItemButton onClick={handleOpenAddChannels} sx={{ pl: 4 }}>
                <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
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
            </ListItem>
          </List>
        </Collapse>
        <ListItemButton onClick={handleDirectMessage}>
          <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
            <ArrowRightIcon color="grey" />
          </ListItemIcon>
          <ListItemText primary="Direct messages " />
          {openChanels ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDirectMessage} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            dense
            sx={{ maxHeight: "20rem", overflow: "auto" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
                <TagIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="You" />
            </ListItemButton>
            <ListItemButton onClick={handleOpenAddDirectMessage} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px", marginRight: "0.5rem" }}>
                <AddIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="Add teammates" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Dialog
        open={openAddChannels}
        onClose={handleCloseAddChannels}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle>Create a channel</DialogTitle>
        <DialogContent>
          <DialogContentText variant="subtitle1">Room Name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="room"
            value={room}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <DialogContentText variant="subtitle1">
            Description - optional
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <DialogContentText variant="subtitle1">
            Password - optional
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="pasword"
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <Collapse in={errorOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
        <DialogActions>
          <Button onClick={hadletry} variant="contained" color="success">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        scroll="paper"
        open={openAddDirectMessage}
        onClose={handleCloseAddDirectMessage}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle>Search User</DialogTitle>
        <DialogContent sx={{ overflow: "unset" }}>
          <TextField
            autoFocus
            margin="dense"
            id="room"
            value={name}
            type="text"
            onChange={handleChangeName}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <Collapse in={errorOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
        <DialogActions>
          <Button onClick={searchUser} variant="contained" color="success">
            Search
          </Button>
        </DialogActions>
        <Grid
          container
          spacing={2}
          paddingLeft={6}
          marginY={1}
          alignItems="center"
        >
          {users.lenght === 0 ? (
            <DialogContent>'No Result'</DialogContent>
          ) : (
            <>
              {users.map((user, index) => (
                <Fragment key={index}>
                  <Grid xs={4} item>
                    {user.name}
                  </Grid>
                  <Grid xs={6} item>
                    {user.email}
                  </Grid>
                  <Grid xs={2} item>
                    <IconButton size="small" edge="end">
                      <MessageIcon color="primary" />
                    </IconButton>
                  </Grid>
                </Fragment>
              ))}
            </>
          )}
        </Grid>
      </Dialog>
    </>
  );
}
export default RoomList;
