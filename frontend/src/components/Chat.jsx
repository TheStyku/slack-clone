import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TagIcon from "@mui/icons-material/Tag";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextInput from "./TextInput";
import Message from "./Message";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useContext } from "react";
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
  const { activeRooms, token, room, dispatch } = useContext(UserContext);

  const API_URL =  process.env.REACT_APP_TITLE+"api/message/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      room: room,
    },
  };

  const handleClick1 = async (e) => {
    await axios
      .get(API_URL, config)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "CLEAR_MESSAGE" });
        response.data.forEach((item) =>
          dispatch({
            type: "ADD_MESSAGE",
            payload: { id: 1, text: item.text, name: item.user.name, date: item.date },
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
        console.log(response.data);
        dispatch({ type: "CLEAR_MESSAGE" });
        response.data.forEach((item) =>
          dispatch({
            type: "ADD_MESSAGE",
            payload: { id: item._id, text: item.text, name: item.user.name, date: item.date },
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleClick = (rooms) => {
    console.log(rooms);
    dispatch({ type: "SET_ROOM", payload: { room: rooms } });
    getMessage(rooms);
  };

  useEffect(() => {
    if (!ifInit) {
      handleClick1();
       // eslint-disable-next-line
      ifInit = true;
      
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid sx={{ flexGrow: 1 }} rowSpacing={1} container mt={0.05}>
          <Grid item xs={10} px={2} mb={1}>
            {activeRooms.map((rooms, index) => (
              <Button
                key={index}
                onClick={(e) => handleClick(rooms)}
                variant="text"
                color="dark"
                sx={{ fontWeight: 600 }}
              >
                <TagIcon /> {rooms} <ArrowDropDownIcon />
              </Button>
            ))}
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
        <Box
          sx={{
            display: "flex",
            m: 1,

            height: 20,
          }}
        >
          <Chip
            label="Add bookmark"
            variant="outlined"
            size="small"
            onClick={handleClick}
            icon={<ArrowDropDownIcon />}
          />
        </Box>

        <Divider />
        <Message socket={socket} />
        <TextInput socket={socket} />
      </ThemeProvider>
    </>
  );
}
export default Chat;
