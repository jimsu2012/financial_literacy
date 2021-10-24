import { CardMedia, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import bookmarkedIcon from "../assets/bookmarked.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import completedIcon from "../assets/completed.svg";
import { axiosInstance } from "../constants";
import cc from "../assets/creditcard.png";

function LessonExplorer(props) {
  const his = useHistory();
  const [isLiked, setisLiked] = useState([]);
  const [resDataById, setresDataById] = useState();
  const { id, title } = useParams();
  console.log(id);
  const onClose = (e) => {
    e.preventDefault();
    his.push("/explore");
  };
  const toggleBookmark = (idx) => {
    let likearr = [...isLiked];
    likearr[idx + 1] = !likearr[idx + 1];
    setisLiked(likearr);
  };
  useEffect(() => {
    getArticleInfo();
  }, [id]);
  const getArticleInfo = () => {
    axiosInstance
      .get("/api/articles/" + id + "/")
      .then((response) => {
        if (response) {
          setresDataById(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
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
    <>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bolder", textAlign: "left", margin: "50px" }}
      >
        Quick Guide
      </Typography>
      {resDataById ? (
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
          <Tooltip title="Close" arrow>
            <Box
              className="button-x"
              onClick={onClose}
              sx={{ position: "fixed", left: "6%" }}
            >
              X
            </Box>
          </Tooltip>
          <Box>
            <CardMedia sx={{ textAlign: "center" }}>
              <img src={cc} />
            </CardMedia>
            <Typography
              sx={{
                fontSize: 40,
                letterSpacing: -2,
                fontWeight: "bold",
                fontFamily: "Raleway",
              }}
            >
              {resDataById["title"]}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 7, textAlign: "left" }}>
            <Stack>
              {lessons.map((lesson, idx) => (
                <Stack
                  direction="row"
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
                  <Stack
                    direction="row"
                    className="show-lesson"
                    onClick={(e) => {
                      onOpenLessonPage(idx, e);
                    }}
                  >
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
                    <Tooltip
                      title={lesson.bookmarked ? "Unbookmark" : "Bookmark"}
                      TransitionComponent={Zoom}
                      arrow
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
                    </Tooltip>

                    {lesson.completed == true && (
                      <Tooltip
                        title="Completed"
                        TransitionComponent={Zoom}
                        arrow
                      >
                        <img sx={{ width: "66px" }} src={completedIcon} />
                      </Tooltip>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default LessonExplorer;
