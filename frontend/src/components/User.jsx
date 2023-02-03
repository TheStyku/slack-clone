import Navbar from "./Navbar";
import Chat from "./Chat";
import Room from "./Room";
import Grid from "@mui/material/Grid";
import socketIO from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";

const socket = socketIO.connect("http://localhost:4000");

function User() {
  const { _id, } = useContext(UserContext);
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  useEffect(() => {
    if (_id === "") {
      navigate("/");
    } else {
      setLog(true);
    }
  }, [navigate, _id]);

  return (
    <>
      {log === true ? (
        <>
          <Navbar />
          <Grid  container>
            <Grid item xs={2}>
              <Room socket={socket}/>
            </Grid>
            <Grid item xs={10}>
              <Chat socket={socket} />
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default User;
