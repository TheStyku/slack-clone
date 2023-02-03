import { useState, useEffect, useContext } from "react";
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

function Message({ socket }) {
  const [message, setMessage] = useState([
    { id: 1, text: "hello", user: "tak" },
    {
      id: 2,
      text: "world",
      user: "tak",
    },
    {
      id: 3,
      text: "to",
      user: "Nie",
    },
    {
      id: 4,
      text: "me",
      user: "Nie",
    },
  ]);
  const { name } = useContext(UserContext);
  const handleClick =(e) =>{
    socket.emit('join_room','start')
  }
  useEffect(() => {
    
    socket.on("recive_messege", (data) => {
      setMessage([...message, { id: 1, text: data }]);
      console.log("i fire once");
      console.log(message)
    });
  }, [socket, message]);

  return (
    <Box>
      <List sx={{ maxHeight: 350, overflow: "auto", minHeight: "22rem" }}>
        {message.map((messag, index) =>
          (index >0 && message[index].user !== message[index-1].user) || index===0  ? (
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
                      {name}
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
        )}
      </List>
    </Box>
  );
}
export default Message;

/* 
 <Tooltip
              placement="top-end"
              title={
                <>
                  
                </>
              }
            > </Tooltip>
*/
