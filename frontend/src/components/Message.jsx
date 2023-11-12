import { useEffect, useContext } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import UserContext from "../context/user/UserContext";
import { DateTime } from "luxon";

function Message({ socket }) {
  const { message, dispatch } = useContext(UserContext);

  useEffect(() => {
    socket.off("recive_messege").on("recive_messege", (data) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { id: 1, text: data.message, name: data.name, date: data.date },
      });
      console.log("i fire once");
      console.log(data);
    });
  }, [socket, dispatch]);

  return (
    <Box>
      <List sx={{ maxHeight: 360, overflow: "auto", minHeight: "26rem", display: 'flex', flexDirection: 'column-reverse'}}>
        {message.lenght !== 0 ? (
          message
            .map((messag, index) =>
              (index > 0 && message[index].user !== message[index - 1].user) ||
              index === 0 ? (
                <ListItem
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f8f8f8" },
                    paddingBottom: "0px",
                  }}
                >                
                    <ListItemAvatar sx={{ minWidth: "46px" }}>
                      <Avatar variant="square" sx={{ width: 36, height: 36 }}>
                        H
                      </Avatar>
                    </ListItemAvatar>
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
                        <Tooltip placement="top" title={DateTime.fromISO(messag.date).toFormat('ff') }>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            ml={1}
                          >
                           {DateTime.fromISO(messag.date).toFormat('ff')}
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
            .reverse()
        ) : (
          <></>
        )}
      </List>
    </Box>
  );
}
export default Message;
