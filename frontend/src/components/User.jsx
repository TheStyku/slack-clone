import Navbar from "./Navbar";
import Chat from "./Chat";
import Room from "./Room";
import Grid from "@mui/material/Grid";
import socketIO from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { createTheme, ThemeProvider, } from "@mui/material/styles";
const socket = socketIO.connect("http://localhost:4000");

function User() {
  const { _id, room} = useContext(UserContext);
  const navigate = useNavigate();
  const [log, setLog] = useState(false);

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      neutral: {
        main: "#f5f5f5",
      },
      grey: {
        main: "#bdbdbd",
      },
      button: {
        main: "#ffffff33",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  useEffect(() => {
    socket.emit('join_room',room)
    if (_id === "") {
      navigate("/");
    } else {
      setLog(true);
    }
  }, [navigate, _id,room]);

  return (
    <>
      {log === true ? (
        <>
        <ThemeProvider theme={theme}>
        <Navbar />
          <Grid  container>
            <Grid item xs={2}>
              <Room socket={socket}/>
            </Grid>
            <Grid item xs={10}>
              <Chat socket={socket} />
            </Grid>
          </Grid>
        </ThemeProvider>
         
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default User;
