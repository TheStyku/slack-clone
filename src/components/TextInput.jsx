import { styled } from "@mui/material/styles";
import {
  InputBase,
  IconButton,
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import LinkIcon from "@mui/icons-material/Link";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SendIcon from "@mui/icons-material/Send";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function TextInput({ socket }) {
  const [alignment, setAlignment] = useState("left");
  const [formats, setFormats] = useState(() => ["italic"]);
  const [message, setMessage] = useState("");

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          margin: "1rem  1rem 0rem 1rem",
          
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs="auto" sx={{ display: "flex" }}>
            <StyledToggleButtonGroup
              size="small"
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <StrikethroughSIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <IconButton aria-label="link">
              <LinkIcon />
            </IconButton>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <IconButton aria-label="format-number">
              <FormatListNumberedIcon />
            </IconButton>
            <IconButton aria-label="format-bullet">
              <FormatListBulletedIcon />
            </IconButton>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <StyledToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
          <Grid item>
            <InputBase
              sx={{ px: 1, flex: 1 }}
              placeholder="Search Google Maps"
              size="medium"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={handleChange}
              fullWidth
              name="message"
              value={message}
            />
          </Grid>
          <Grid
            item
            xs="auto"
            sx={{
              display: "flex",
              justifyContent: " space-between",
              paddingRight: "1rem",
            }}
          >
            <Grid item sx={{ display: "flex" }}>
              <IconButton value="left" aria-label="left aligned">
                <AddCircleIcon />
              </IconButton>
              <IconButton value="center" aria-label="centered">
                <VideoCallIcon />
              </IconButton>
              <IconButton value="right" aria-label="right aligned">
                <MicIcon />
              </IconButton>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ mx: 0.5, my: 1 }}
              />
              <IconButton value="bold" aria-label="bold">
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <IconButton value="italic" aria-label="italic">
                <AlternateEmailIcon />
              </IconButton>
              <IconButton value="underlined" aria-label="underlined">
                <FormatSizeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <ButtonGroup variant="contained" color="success">
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
                <IconButton value="underlined" aria-label="underlined">
                  <ArrowDropDown />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default TextInput;
