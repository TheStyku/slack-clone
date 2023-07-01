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
  const { token, room, dispatch } = useContext(UserContext);

  const API_URL = "http://localhost:4000/api/message/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      room: room
    }
  };

  const handleClick1 = async (e) => {
    await axios
      .get(
        API_URL,         
        config
      )
      .then((response) => {
        console.log(response.data);
        dispatch({type:'CLEAR_MESSAGE'})
        response.data.forEach(item=> 
          dispatch({type:'ADD_MESSAGE', payload:{ id: 1, text: item.text, name: item.user.name}})
          )
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleClick = () => {};

  useEffect(() => {  
    handleClick1()
  },[] );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid sx={{ flexGrow: 1 }} rowSpacing={1} container mt={0.05}>
          <Grid item xs={10} px={2} mb={1}>
            <Button variant="text" color="dark" sx={{ fontWeight: 600 }}>
              <TagIcon /> general <ArrowDropDownIcon />
            </Button>
          </Grid>
          <Grid item xs={1}  sx={{ display: "flex", alignItems: "center", paddingLeft: '5rem' }}>
            <ButtonGroup size="small">
              <Button size="small" color="dark">
                <Avatar  sx={{ width: 20, height: 20 }}/> 1
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
