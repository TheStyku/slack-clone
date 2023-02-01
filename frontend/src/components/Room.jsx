import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import RoomList from "./RoomList";
import { useState, useContext } from "react";
import UserContext from "../context/user/UserContext";
import {
  bindTrigger,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";

function Room() {
  const { name } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  const popupState1 = usePopupState({ variant: "popover", popupId: "top" });
  const popupState2 = usePopupState({ variant: "popover", popupId: "botton" });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "#303E4D",
          }}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            divider={<Divider style={{ background: "grey" }} flexItem />}
          >
            <Divider style={{ background: "grey" }} />
            <ButtonGroup variant="text" >
              <Button
                id="demo-positioned-button"
                aria-labelledby="demo-positioned-button"
                {...bindTrigger(popupState1)}
                fullWidth
                color="neutral"
                sx={{ borderRight: "none" }}
              >
                {name}
                <ArrowDropDownIcon />
              </Button>
              <Button sx={{ p: "10px" }} aria-label="history" color="neutral">
                <EditRoundedIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              onClose={popupState1.close}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              {...bindMenu(popupState1)}
            >
              <MenuItem onClick={popupState1.close}>Profile</MenuItem>
              <MenuItem onClick={popupState1.close}>My account</MenuItem>
              <MenuItem onClick={popupState1.close}>Logout</MenuItem>
            </Menu>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#303E4D",
                marginBottom: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <Button
                sx={{ justifyContent: "flex-start", paddingLeft: "1rem" }}
                color="grey"
                fullWidth
                size="small"
              >
                <ChatIcon fontSize="small" sx={{ marginRight: "0.5rem" }} />{" "}
                Threads
              </Button>
              <Button
                sx={{ justifyContent: "flex-start", paddingLeft: "1rem" }}
                color="grey"
                fullWidth
                size="small"
              >
                <SendIcon fontSize="small" sx={{ marginRight: "0.5rem" }} />{" "}
                Draft & send
              </Button>
              <Button
                sx={{ justifyContent: "flex-start", paddingLeft: "1rem" }}
                color="grey"
                fullWidth
                size="small"
              >
                <MoreVertIcon fontSize="small" sx={{ marginRight: "0.5rem" }} />
                More
              </Button>
            </Box>

            <Box
              sx={{
                height: "61.8vh",
                marginTop: "0.5rem",
              }}
            >
              <RoomList theme={theme} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#303E4D",
              }}
            >
              <Button
                id="botton"
                {...bindTrigger(popupState2)}
                color="grey"
                sx={{ paddingLeft: "1rem" }}
              >
                General <ArrowDropDownIcon />
              </Button>
              <Menu
                id="botton"
                aria-labelledby="botton"
                onClose={popupState2.close}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                {...bindMenu(popupState2)}
              >
                <MenuItem onClick={popupState2.close}>Profile</MenuItem>
              </Menu>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}
export default Room;

/* 

<Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Box
            sx={{
              border: "solid 1px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#303E4D",
            }}
          >
            <Button
              id="demo-positioned-button"
              aria-labelledby="demo-positioned-button"
              {...bindTrigger(popupState1)}
              fullWidth
              variant="outlined"
              color="neutral"
              //sx={{ color: "#2C3849" }}
            >
              {name}
              <ArrowDropDownIcon />
              <IconButton
                sx={{ p: "10px", backgroundColor: "#FFFFFF" }}
                aria-label="history"
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Button>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              onClose={popupState1.close}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              {...bindMenu(popupState1)}
            >
              <MenuItem onClick={popupState1.close}>Profile</MenuItem>
              <MenuItem onClick={popupState1.close}>My account</MenuItem>
              <MenuItem onClick={popupState1.close}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#303E4D",
              borderTop: "1px solid grey",
            }}
          >
            <Button
              sx={{ justifyContent: "flex-start" }}
              color="grey"
              fullWidth
            >
              <EditRoundedIcon /> Threads
            </Button>
            <Button
              sx={{ justifyContent: "flex-start" }}
              color="grey"
              fullWidth
            >
              <EditRoundedIcon /> Draft & send
            </Button>
          </Box>
          <RoomList theme={theme} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#303E4D",
              borderTop: "1px solid grey",
            }}
          >
            <Button id="botton" {...bindTrigger(popupState2)} color="grey">
              General
            </Button>
            <Menu
              id="botton"
              aria-labelledby="botton"
              onClose={popupState2.close}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              {...bindMenu(popupState2)}
            >
              <MenuItem onClick={popupState2.close}>Profile</MenuItem>
            </Menu>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </Box>

*/
