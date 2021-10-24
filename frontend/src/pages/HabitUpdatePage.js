import { Button, CardMedia, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";
import Progress from "../components/Progress";
import coin from "../assets/coin.png";
import { useEffect, useState } from "react";
import { axiosInstance, getAxiosConfig } from "../constants";
const HabitUpdatePage = () => {
  const [loading, setloading] = useState(true);
  const [habitData, sethabitData] = useState();
  const [goalsId, setgoalsId] = useState([]);
  const [goalsinfo, setgoalsinfo] = useState([]);
  const [allGoals, setallGoals] = useState([]);
  const { id } = useParams();
  const his = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/api/habits/" + id + "/", getAxiosConfig())
      .then((res) => {
        if (res.data && res.data.goals) {
          sethabitData(res.data);
          setgoalsId(res.data.goals);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  useEffect(() => {
    const getDataById = async () => {
      const res = await Promise.all(
        goalsId.map((id) =>
          axiosInstance.get("/api/goals/" + id + "/", getAxiosConfig())
        )
      );
      setallGoals(res);
      setgoalsinfo(res.map((r) => r.data.goals));
    };
    getDataById();
  }, [goalsId]);
  useEffect(() => {
    if (allGoals.length > 0) {
      setloading(false);
    }
  }, [allGoals]);
  console.log("s");
  console.log(allGoals);
  console.log("E");
  const onGoBack = (e) => {
    e.preventDefault();
    his.push("/habits");
  };
  return (
    <>
      {habitData ? (
        <>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bolder", textAlign: "left", margin: "30px" }}
          >
            My Goal
          </Typography>
          <Box
            sx={{
              borderRadius: 3,
              background: "#fff",
              filter: "drop-shadow(0px 3px 20px rgba(0, 0, 0, 0.09))",
              width: "75%",
              padding: 5,
              margin: "24px auto",
              maxWidth: "800px",
              top: "10px",
              position: "relative",
            }}
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
                textAlign: "center",
              }}
            >
              {habitData.title}
            </Typography>
            <Typography
              sx={{
                fontsize: 25,
                fontWeight: "normal",
                fontFamily: "Raleway",
                top: -18,
                position: "relative",
                textAlign: "right",
              }}
            >
              Savings: ${habitData.amount_saved_per_day}
            </Typography>
            <Box sx={{ textAlign: "center", margin: 13 }}>
              {habitData.description}
            </Box>
            {!loading && allGoals[0] ? (
              <Stack direction="row">
                <CardMedia
                  sx={{
                    textAlign: "center",
                    minWidth: "40%",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={coin}
                    style={{ maxWidth: 110, position: "relative" }}
                  />
                </CardMedia>
                <Stack direction="column">
                  My Progress
                  <Progress val={40} />
                  <Stack>
                    {allGoals.length > 0 &&
                      allGoals.map((goal, idx) => {
                        <Box>
                          Goal {idx + 1}
                          <Typography>
                            {" "}
                            Starts: {goal.data.date_start}{" "}
                          </Typography>
                          <Typography> Ends: {goal.data.date_end}</Typography>
                          <Typography>
                            Goal Completed for {goal.data.goal_days.length} days
                          </Typography>
                        </Box>;
                      })}
                  </Stack>
                  <Button
                    onClick={onGoBack}
                    className="button-x"
                    sx={{
                      color: "white",
                      marginTop: 12,
                      textTransform: "none",
                      background:
                        "linear-gradient(180deg, #BB3CE1 0%, #D946E4 100%) !important",
                    }}
                  >
                    Go back
                  </Button>
                </Stack>
              </Stack>
            ) : (
              "Loading..."
            )}
          </Box>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default HabitUpdatePage;
