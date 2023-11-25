import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TagIcon from "@mui/icons-material/Tag";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextInput from "./TextInput";
import Message from "./Message";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useContext, useState } from "react";
import UserContext from "../context/user/UserContext";
import axios from "axios";


function Chat({ socket }) {
  let ifInit = false;
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#f5f5f5",
      },
      grey: {
        main: "#bdbdbd",
      },
      dark: {
        main: "#212121",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  const { activeRooms, token, room, email, dispatch, _id } =
    useContext(UserContext);

    const [temp, setTemp] = useState()

  const API_URL = process.env.REACT_APP_TITLE + "/api/message/";
  const API_URL_USER = process.env.REACT_APP_TITLE + "/api/users/me";
  const API_URL_UPDATE = process.env.REACT_APP_TITLE + "/api/users/update/delete";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      room: room,
    },
  };

  const updateActiveRooms = async (t) => {
    await axios
      .patch(API_URL_UPDATE, { _id: _id, activeRooms: t })
      .then((response) => {console.log(response.data)});
  };

  const handleStart = async () => {
    await axios
      .get(API_URL_USER, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          email: email,
        },
      })
      .then((response) => {
        dispatch({
          type: "SET_ACTIVE_ROOM",
          payload: { activeRooms: response.data.activeRooms },
        });
        dispatch({
          type: "SET_ROOM_LIST",
          payload: { roomsList: response.data.rooms },
        });
        setTemp(response.data.rooms)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleClick1 = async () => {
    await axios
      .get(API_URL, config)
      .then((response) => {
        dispatch({ type: "CLEAR_MESSAGE" });
        response.data.forEach((item) =>
          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: 1,
              text: item.text,
              name: item.user.name,
              date: item.date,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
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

  const handleClick = (rooms) => {
    dispatch({ type: "SET_ROOM", payload: { room: rooms } });
    getMessage(rooms);
  };

  const handleDelete = (rooms) => {
    dispatch({ type: "DELETE_ACTIVE_ROOM", payload: { room: rooms } });
    updateActiveRooms(rooms)
  };

  useEffect(() => {
    if (!ifInit) {
      handleClick1();
      handleStart();
      // eslint-disable-next-line
      ifInit = true;
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid sx={{ flexGrow: 1 }} rowSpacing={1} container mt={0.05}>
          <Grid item xs={10} px={2} mb={1}>
            <Stack direction="row" spacing={1}>
              {activeRooms.map((rooms, index) => (
                /*
              <Button
                key={index}
                onClick={(e) => handleClick(rooms)}
                variant="text"
                color="dark"
                sx={{ fontWeight: 600 }}
              >
                <TagIcon /> {rooms} <ArrowDropDownIcon />
              </Button>
              */
                <Chip
                  key={index}
                  label={rooms}
                  onClick={(e) => handleClick(rooms)}
                  onDelete={(e) => handleDelete(rooms)}
                  deleteIcon={<DeleteIcon />}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: "flex", alignItems: "center", paddingLeft: "5rem" }}
          >
            <ButtonGroup size="small">
              <Button size="small" color="dark">
                <Avatar sx={{ width: 20, height: 20 }} /> 1
              </Button>
              <Button size="small" color="dark">
                Add
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Divider />
        <Message socket={socket} />
        <TextInput socket={socket} />
      </ThemeProvider>
    </>
  );
}
export default Chat;
