import { Button, CardMedia, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import Progress from "./Progress";
import coin from "../assets/coin.png";
import { useEffect, useState } from "react";

const HabitCard = (props) => {
  const { id, owner, title, description, apd, goals } = props.data;
  const { goalarr } = props?.goalarr;
  const { goalinfo } = props?.goalinfo;
  const his = useHistory();
  useEffect(() => {}, []);
  const onOpenHabit = (e) => {
    e.preventDefault();
    his.push("/habits/goals/" + id);
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
      className="habit-b"
    >
      {props?.goalarr && props?.goalinfo ? (
        <>
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
                onClick={onOpenHabit}
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
        </>
      ) : (
        "Loading"
      )}
    </Box>
  );
};

export default HabitCard;
