import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExploreCard from "../components/ExploreCard";
import "../style/ExplorePage.css";
import bag from "../assets/bag.png";
import coin from "../assets/coin.png";
import cc from "../assets/creditcard.png";
import { axiosInstance } from "../constants";
const ExplorePage = () => {
  const [resData, setresData] = useState([]);
  useEffect(() => {
    getGuides();
  }, []);
  const getGuides = () => {
    axiosInstance
      .get("/api/articles/")
      .then((response) => {
        if (response) {
          setresData(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const lessons = resData;
  const lesson_arr = lessons.reduce((lesson_arr, k, idx) => {
    return (
      (idx % 2 == 0
        ? lesson_arr.push([k])
        : lesson_arr[lesson_arr.length - 1].push(k)) && lesson_arr
    );
  }, []);
  return (
    <div className="explore">
      <Typography
        variant="h3"
        sx={{ fontWeight: "bolder", textAlign: "left", margin: "50px" }}
      >
        Quick Guide
      </Typography>
      {lesson_arr.map((two_lesson) => (
        <Stack
          direction={window.innerWidth > 900 ? "row" : "column"}
          sx={{ justifyContent: "center" }}
        >
          {two_lesson.map((lesson) => (
            <ExploreCard img={cc} desc={lesson.title} id={lesson.id} />
          ))}
        </Stack>
      ))}
    </div>
  );
};

export default ExplorePage;
