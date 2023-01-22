import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { useState } from "react";

function RoomList() {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
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
  });

  return (
    <ThemeProvider theme={theme}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#303E4D",
          color: "#bdbdbd",
        }}
        dense
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick} >
          <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}  >
            <ArrowRightIcon  color="grey" />
          </ListItemIcon>
          <ListItemText
            primary="channels "
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit >
          <List component="div" disablePadding dense>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <TagIcon color="grey" />
              </ListItemIcon>
              <ListItemText
                primary="general"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <AddIcon color="grey" />
              </ListItemIcon>
              <ListItemText
                primary="Add channels"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
            <ArrowRightIcon color="grey" />
          </ListItemIcon>
          <ListItemText primary="Direct messages " />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense> 
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <TagIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="You" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth:'0px', marginRight: '0.5rem'}}>
                <AddIcon color="grey" />
              </ListItemIcon>
              <ListItemText primary="Add teammates" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}
export default RoomList;
