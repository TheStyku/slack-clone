import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import {styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import tooltipClasses from "@mui/material/Tooltip/tooltipClasses";
import RoomList from "./RoomList";
import { useState, useContext } from "react";
import UserContext from "../context/user/UserContext";
import {
  bindTrigger,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";

function Room({ socket }) {
  const { name } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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

  
  const popupState1 = usePopupState({ variant: "popover", popupId: "top" });
  const popupState2 = usePopupState({ variant: "popover", popupId: "botton" });
  return (
    <>
      
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
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: "0.3rem", marginBottom: "0.3rem" }}
            >
              <Button
                {...bindTrigger(popupState1)}
                color="neutral"
                sx={{ marginLeft: "1rem" }}
              >
                {name}
                <ArrowDropDownIcon />
              </Button>
              <DarkTooltip title="New Message">
                <Button
                  sx={{
                    p: "10px",
                    marginRight: "1rem",
                    minWidth: "0px",
                    borderRadius: "25px",
                  }}
                  color="neutral"
                >
                  <EditRoundedIcon fontSize="small" />
                </Button>
              </DarkTooltip>
            </Stack>

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
                height: " 60.3vh",
                marginTop: "0.5rem",
              }}
            >
              <RoomList socket={socket} />
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
      
    </>
  );
}
export default Room;
