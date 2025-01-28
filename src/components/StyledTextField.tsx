import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  width: "100%",
  maxWidth: "450px",
  "& .MuiInputBase-root": {
    height: "56px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    border: "1px solid #333",
    borderRadius: 0,
    color: "white",
    fontSize: "1.1rem",
    "&:hover": {
      border: "1px solid #666",
    },
    "&.Mui-focused": {
      border: "1px solid white",
    },
  },
  "& .MuiInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
});
