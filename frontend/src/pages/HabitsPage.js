import React from "react";
import addHabit from "../assets/addHabit.svg";
import { CardMedia, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, getAxiosConfig } from "../constants";
import HabitCard from "../components/HabitCard";
const HabitsPage = () => {
  const [resHabitData, setresHabitData] = useState([]);
  const [habitsId, sethabitsId] = useState([]);
  const [goalsIds, setgoalsIds] = useState([]);
  const [goals, setgoals] = useState([]);
  const [habGoal, sethabGoal] = useState([]);
  useEffect(() => {
    getHabitsId();
    const getHabits = async () => {
      const res = await Promise.all(
        habitsId.map((id) =>
          axiosInstance.get("/api/habits/" + id + "/", getAxiosConfig())
        )
      );
      setresHabitData(res.map((r) => r.data));
    };
    getHabits();
  }, []);
  useEffect(() => {
    const getHabits = async () => {
      const res = await Promise.all(
        habitsId.map((id) =>
          axiosInstance.get("/api/habits/" + id + "/", getAxiosConfig())
        )
      );
      setresHabitData(res.map((r) => r.data));
      setgoalsIds(res.map((r) => r.data.goals));
    };
    getHabits();
  }, [habitsId]);
  useEffect(() => {
    const getGoals = async () => {
      for (let i = 0; i < goalsIds.length; i++) {
        const res = await Promise.all(
          goalsIds[i].map((goalid) =>
            axiosInstance.get("/api/goals/" + goalid + "/", getAxiosConfig())
          )
        );
        const arr = res.map((r) => r.data);
        setgoals((pre) => [...pre, arr]);
      }
    };
    getGoals();
  }, [goalsIds]);
  const getHabitsId = () => {
    axiosInstance
      .get("/api/users/" + localStorage.getItem("id") + "/", getAxiosConfig())
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
      {resHabitData.length == goals.length && goalsIds.length > 0 ? (
        <Stack sx={{ alignItems: "center" }}>
          {resHabitData.map((habit, idx) => (
            <HabitCard
              data={habit}
              goalarr={goalsIds[idx]}
              goalinfo={goals[idx]}
            />
          ))}
        </Stack>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default HabitsPage;
