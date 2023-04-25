import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  Button,
  Grid,
  Tooltip,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Box,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { useContext } from "react";
import UserContext from "../context/user/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { name, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
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

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#f5f5f5",
      },
      button: {
        main: "#ffffff33",
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
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#2C3849" }}>
        <Grid sx={{ flexGrow: 1 }} container>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: 32,
              height: 32,
            }}
          >
            <DarkTooltip title="History">
              <IconButton
                sx={{
                  width: "2rem",
                  height: "2rem",
                  marginTop: "5px",
                  borderRadius: "0px",
                  paddingRight: "1rem",
                }}
                color="grey"
              >
                <HistoryIcon />
              </IconButton>
            </DarkTooltip>
          </Grid>
          <Grid item xs={7}>
            <DarkTooltip title={<Typography>Search {name}</Typography>}>
              <Button
                fullWidth
                size="small"
                sx={{
                  lineHeight: " 2.4",
                  color: "#ffffff",
                  justifyContent: "flex-start",
                  paddingY: "0px",
                  marginTop: "5px",
                }}
                color="button"
                variant="contained"
              >
                Search {name}
              </Button>
            </DarkTooltip>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <DarkTooltip title="Help">
              <IconButton
                size="small"
                color="grey"
                sx={{
                  width: "2rem",
                  height: "2rem",
                  marginTop: "5px",
                  borderRadius: "0px",
                }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </DarkTooltip>
            <>
              <IconButton
                size="small"
                sx={{ mr: 2 }}
                {...bindTrigger(popupState)}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem>
                  <Avatar /> {name}
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
export default Navbar;
