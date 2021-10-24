import React from "react";
import addHabit from "../assets/addHabit.svg";
import { CardMedia, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../constants";
import HabitCard from "../components/HabitCard";
const HabitsPage = () => {
  const [resHabitData, setresHabitData] = useState([]);
  const [habitsId, sethabitsId] = useState([]);
  useEffect(() => {
    getHabitsId();
    const getHabits = async () => {
      const res = await Promise.all(
        habitsId.map((id) => axiosInstance.get("/api/habits/" + id + "/"))
      );
      setresHabitData(res.map((r) => r.data));
    };
    getHabits();
  }, []);
  useEffect(() => {
    const getHabits = async () => {
      const res = await Promise.all(
        habitsId.map((id) => axiosInstance.get("/api/habits/" + id + "/"))
      );
      setresHabitData(res.map((r) => r.data));
    };
    getHabits();
  }, [habitsId]);
  const getHabitsId = () => {
    axiosInstance
      .get("/api/users/" + localStorage.getItem("id") + "/")
      .then((response) => {
        if (response && response.data.habits_owned) {
          sethabitsId(response.data.habits_owned);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const his = useHistory();
  console.log(resHabitData);
  const onAddHabit = (e) => {
    e.preventDefault();
    his.push("/habits/add");
  };

  return (
    <div className="habits-main">
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bolder", textAlign: "left", margin: "50px" }}
        >
          My Habits
        </Typography>
        <CardMedia>
          <Tooltip title="Add habit" TransitionComponent={Zoom} arrow>
            <img
              src={addHabit}
              onClick={onAddHabit}
              alt="Add habit"
              style={{ maxWidth: 70 }}
              className="button-x"
            />
          </Tooltip>
        </CardMedia>
      </Stack>
      {resHabitData.length > 0 ? (
        <Stack sx={{ alignItems: "center" }}>
          {resHabitData.map((habit) => (
            <HabitCard data={habit} />
          ))}
        </Stack>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default HabitsPage;
