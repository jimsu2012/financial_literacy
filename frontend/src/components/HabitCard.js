import { Button, CardMedia, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import Progress from "./Progress";
import coin from "../assets/coin.png";

const HabitCard = (props) => {
  const { id, owner, title, description, apd, goals } = props.data;
  const his = useHistory();
  const onOpenHabit = (e) => {
    e.preventDefault();
    his.push("/habits/update/" + id);
  };
  return (
    <Box
      sx={{
        borderRadius: 3,
        background: "#fff",
        filter: "drop-shadow(0px 3px 20px rgba(0, 0, 0, 0.09))",
        width: "75%",
        padding: 5,
        margin: 3,
        maxWidth: "800px",
      }}
      onClick={onOpenHabit}
      className="habit-b"
    >
      <Typography
        sx={{
          fontSize: 40,
          letterSpacing: -2,
          fontWeight: "bold",
          fontFamily: "Raleway",
          top: -18,
          position: "relative",
        }}
      >
        {title}
      </Typography>
      <Stack direction="row">
        <CardMedia
          sx={{ textAlign: "center", minWidth: "40%", textAlign: "left" }}
        >
          <img src={coin} style={{ maxWidth: 110, position: "relative" }} />
        </CardMedia>
        <Stack direction="column">
          My Progress
          <Progress val={40} />
          <Button
            className="button-x"
            sx={{
              color: "white",
              textTransform: "none",
              background:
                "linear-gradient(180deg, #BB3CE1 0%, #D946E4 100%) !important",
            }}
          >
            Update today
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HabitCard;
