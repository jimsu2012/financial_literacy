import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExploreCard from "../components/ExploreCard";
import "../style/ExplorePage.css";
import bag from "../assets/bag.png";
import coin from "../assets/coin.png";
import cc from "../assets/creditcard.png";
import axios from "axios";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
const ExplorePage = () => {
  const lessons = [
    { id: 101, img: bag, desc: "The guide to saving in college" },
    { id: 102, img: coin, desc: "Budgeting 101" },
    { id: 103, img: cc, desc: "All about credit card" },
  ];
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
        Quick Lessons
      </Typography>
      {lesson_arr.map((two_lesson) => (
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          {two_lesson.map((lesson) => (
            <ExploreCard img={lesson.img} desc={lesson.desc} id={lesson.id} />
          ))}
        </Stack>
      ))}
    </div>
  );
};

export default ExplorePage;
