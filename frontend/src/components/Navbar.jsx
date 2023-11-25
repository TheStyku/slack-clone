import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  Button,
  Grid,
  Tooltip,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Box,
  tooltipClasses,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Collapse,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { useContext, useState, Fragment } from "react";
import UserContext from "../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { name, dispatch, token, activeRooms,_id } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [room, setRoom] = useState("");
  const [enterPassword, SetEnterPassword] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [choise, setChoise] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const API_URL = process.env.REACT_APP_TITLE + "/api/room/search/";
  const API_URL_ROM = process.env.REACT_APP_TITLE + "/api/message/";
  const API_URL_UPDATE = process.env.REACT_APP_TITLE + "/api/users/update/rooms";

  const getMessage = async (name) => {
    await axios
      .get(API_URL_ROM, {
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
        dispatch({ type: "SET_ROOM", payload: { room: name } });
        dispatch({type:'ADD_ROOM_LIST', payload: {roomsList: name}})
        handleCloseDialog(false);
        setErrorOpen(false);
        setChoise("");
        setRoom("");
        SetEnterPassword(false);
        setPasswordInput('');
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const updateRooms = async (n) => {
    await axios
      .patch(API_URL_UPDATE, { _id: _id, rooms: n })
      .then((response) => {
        console.log(response.data);
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChoise = (name, password) => {
    if (password === undefined || password === "") {
      getMessage(name);
      updateRooms(name)
    } else {
      setChoise(name);
      SetEnterPassword(!enterPassword);
    }
  };

  const sendPassword = async () => {
    await axios
      .post(
        API_URL,
        {
          name: choise,
          password: passwordInput,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        getMessage(response.data.name);
        updateRooms(response.data.name)
      })
      .catch((err) => {
        setError(err.response.data.message);
        setErrorOpen(true);
      });
  };

  const handleSearch = async () => {
    await axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          room: room,
        },
      })
      .then((response) => {
        setSearchResult([]);
        response.data.forEach((data) => {
          setSearchResult((arr) => [
            ...arr,
            {
              id: data._id,
              name: data.name,
              description: data.description,
              password: data.password,
            },
          ]);
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: theme.typography.pxToRem(14),
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#2C3849" }}>
      <Grid sx={{ flexGrow: 1 }} container>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: 32,
            height: 32,
          }}
        ></Grid>
        <Grid item xs={7}>
          <DarkTooltip title={<Typography>Search {name}</Typography>}>
            <Button
              fullWidth
              size="small"
              sx={{
                lineHeight: " 2.4",
                color: "#ffffff",
                justifyContent: "flex-start",
                paddingY: "0px",
                marginTop: "5px",
              }}
              color="button"
              variant="contained"
              onClick={handleOpenDialog}
            >
              Search {name}
            </Button>
          </DarkTooltip>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <DarkTooltip title="Help">
            <IconButton
              size="small"
              color="grey"
              sx={{
                width: "2rem",
                height: "2rem",
                marginTop: "5px",
                borderRadius: "0px",
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </DarkTooltip>
          <>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              {...bindTrigger(popupState)}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu
              {...bindMenu(popupState)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem>
                <Avatar /> {name}
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="room"
            label="room"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        {searchResult.lenght === 0 ? (
          <DialogContentText>'No Result'</DialogContentText>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              paddingX={2}
              paddingTop={1}
              alignItems="center"
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Typography>Room Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Description</Typography>
              </Grid>
              {enterPassword === false ? (
                searchResult.map((item, index) => (
                  <Fragment key={index}>
                    <Grid item padding={1} xs={1}>
                      {item.password === undefined || item.password === "" ? (
                        <LockOpenIcon color="success" />
                      ) : (
                        <LockIcon color="error" />
                      )}
                    </Grid>
                    <Grid item padding={1} xs={7}>
                      <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item padding={1} xs={3}>
                      <Typography>{item.description}</Typography>
                    </Grid>
                    <Grid item padding={1} xs={1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleChoise(item.name, item.password)}
                      >
                        <KeyboardDoubleArrowRightIcon />
                      </IconButton>
                    </Grid>
                  </Fragment>
                ))
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                    marginX={2}
                  >
                    <IconButton
                      color="primary"
                      onClick={(e) => SetEnterPassword(false)}
                    >
                      <KeyboardDoubleArrowLeftIcon />
                    </IconButton>
                    <TextField
                      label="Password"
                      fullWidth
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                    <IconButton color="primary" onClick={sendPassword}>
                      <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                  >
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
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        )}

        {enterPassword === true ? (
          <Box marginBottom={3}></Box>
        ) : (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSearch}>Search</Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}
export default Navbar;
