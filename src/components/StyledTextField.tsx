import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#fff",
    transition: "all .2s ease",
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
  "& label": {
    fontFamily: "system-ui",
    left: 8,
    transition: "all .2s ease",
  },
  "& label.Mui-focused": {
    fontFamily: "system-ui",
    fontWeight: "bold",
    color: "rgba(0,0,0,.7)",
    top: 8,
  },
  "& label.MuiInputLabel-animated": {
    top: 8,
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiInput-underline:before": {
    border: "none !important",
  },
});
