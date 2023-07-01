import {useEffect, useContext } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import UserContext from "../context/user/UserContext";
import axios from "axios";

function Message({ socket }) {
  const { message, token, room, dispatch } = useContext(UserContext);
  const handleClick = (e) => {
    socket.emit("join_room", "start");
  };

  const API_URL = "http://localhost:4000/api/message/";
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
            payload: { id: 1, text: item.text, name: item.user.name },
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    socket.off("recive_messege").on("recive_messege", (data) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { id: 1, text: data.message, name: data.name },
      });
      console.log("i fire once");
      console.log(data);
    });
  }, [socket, dispatch]);

  return (
    <Box>
      <List sx={{ maxHeight: 360, overflow: "auto", minHeight: "21rem" }}>
        {message.lenght !== 0? (
          message.map((messag, index) =>
            (index > 0 &&
              message[index].user !== message[index - 1].user) ||
            index === 0 ? (
              <ListItem
                key={index}
                sx={{
                  "&:hover": { backgroundColor: "#f8f8f8" },
                  paddingBottom: "0px",
                }}
              >
                <Tooltip
                  placement="bottom-end"
                  title={
                    <Container fixed>
                      <Paper />
                      <Button onClick={handleClick}>Add</Button>
                      <Button onClick={handleClick1}>get</Button>
                    </Container>
                  }
                >
                  <ListItemAvatar sx={{ minWidth: "46px" }}>
                    <Avatar variant="square" sx={{ width: 36, height: 36 }}>
                      H
                    </Avatar>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ display: "inline" }}
                        component="h1"
                        variant="h6"
                      >
                        {messag.user}
                      </Typography>
                      <Tooltip placement="top" title="5:43 PM">
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          ml={1}
                        >
                          5:43 PM
                        </Typography>
                      </Tooltip>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                      >
                        {messag.text}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ) : (
              <ListItem
                key={index}
                sx={{
                  "&:hover": { backgroundColor: "#f8f8f8" },

                  paddingBottom: "0px",
                }}
              >
                <ListItemAvatar sx={{ minWidth: "46px" }}>
                  <Avatar
                    variant="square"
                    sx={{ width: 36, height: 36, display: "none" }}
                  >
                    H
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                      >
                        {messag.text}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            )
          )
        ) : (
          <></>
        )}
      </List>
    </Box>
  );
}
export default Message;
