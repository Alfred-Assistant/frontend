import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "20em" }}>
        404
      </Typography>
      <Typography variant="body1">Sorry, we can't find that page!</Typography>
      <Button component={Link} to="/" variant="contained">
        Go back
      </Button>
    </Box>
  );
};
export default NotFound;
