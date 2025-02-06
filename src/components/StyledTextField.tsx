import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: {
    xs: "clamp(250px, 80vw, 600px)",
    sm: "clamp(200px, 60vw, 600px)",
  },
  backgroundColor: "#fff",
  transition: "all .2s ease",
  "& label": {
    fontFamily: "system-ui",
    left: 8,
    transition: "all .2s ease",
  },
  "& label.Mui-focused ": {
    fontFamily: "system-ui",
    fontWeight: "bold",
    color: "rgba(0,0,0,.7)",
    top: 8,
  },
  "& label.MuiInputLabel-animated ": {
    top: 8,
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiInput-underline:before": {
    border: "none !important",
  },
  "& .MuiInputBase-root": {
    border: "none",
    padding: "8px",
    color: "rgba(0,0,0,.87)",
    "& input": {
      color: "rgba(0,0,0,.87)",
    },
    "& fieldset": {
      border: "none",
    },
  },
}));
