import { CardMedia, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import bookmarkedIcon from "../assets/bookmarked.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import completedIcon from "../assets/completed.svg";
function LessonExplorer(props) {
  const his = useHistory();
  const [isLiked, setisLiked] = useState([]);
  const toggleBookmark = (idx) => {
    let likearr = [...isLiked];
    likearr[idx + 1] = !likearr[idx + 1];
    setisLiked(likearr);
  };
  const { img, desc, id } = props.location.state.prop;
  const onOpenLessonPage = (idx, e) => {
    e.preventDefault();
    his.push("/lesson/" + id + "/" + idx, {
      prop: props,
    });
  };
  const lessons = [
    {
      index: "1",
      title: "Money drains, to be aware of",
      bookmarked: true,
      completed: true,
    },
    {
      index: "2",
      title: "Where the money piles up",
      bookmarked: false,
      completed: false,
    },
    {
      index: "3",
      title: "Saving your salary",
      bookmarked: false,
      completed: false,
    },
    {
      index: "4",
      title: "Tips for immigrant students",
      bookmarked: false,
      completed: false,
    },
  ];
  return (
    <Stack
      sx={{
        borderRadius: 12,
        background: "#fff",
        filter: "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.09))",
        width: "80%",
        padding: 8,
        margin: "50px auto",
        alignItems: "center",
      }}
    >
      <Box>
        <CardMedia sx={{ textAlign: "center" }}>
          <img src={img} />
        </CardMedia>
        <Typography
          sx={{
            fontSize: 40,
            letterSpacing: -2,
            fontWeight: "bold",
            fontFamily: "Raleway",
          }}
        >
          {desc}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 7, textAlign: "left" }}>
        <Stack>
          {lessons.map((lesson, idx) => (
            <Stack
              direction="row"
              onClick={(e) => {
                onOpenLessonPage(idx, e);
              }}
              id={id + "-" + (idx + 1)}
              sx={
                lesson.completed
                  ? {
                      color: "grey !important",
                      width: "80vw",
                      margin: 3,
                      alignItems: "center",
                    }
                  : {
                      width: "80vw",
                      margin: 3,
                      alignItems: "center",
                    }
              }
            >
              <Stack direction="row" className="show-lesson">
                <Typography
                  sx={{
                    fontSize: 40,
                    letterSpacing: -2,
                    fontWeight: "1000",
                    fontFamily: "Raleway",
                    margin: "0 6vw 7px 0",
                  }}
                >
                  {idx}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 30,
                    letterSpacing: -2,
                    fontWeight: "normal",
                    fontFamily: "Raleway",
                  }}
                >
                  {lesson.title}
                </Typography>
              </Stack>
              <Box
                sx={{
                  marginLeft: "auto",
                  width: "15vw",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                {lesson.bookmarked == true ? (
                  <img
                    sx={{ width: "60px" }}
                    src={bookmarkedIcon}
                    className="bookmark-lesson"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(idx);
                    }}
                  />
                ) : (
                  <img
                    sx={{ width: "60px" }}
                    src={bookmarkIcon}
                    className="bookmark-lesson"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(idx);
                    }}
                  />
                )}
                {lesson.completed == true && (
                  <img sx={{ width: "66px" }} src={completedIcon} />
                )}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default LessonExplorer;
