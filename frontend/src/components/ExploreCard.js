import { CardMedia, imageListClasses, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

const ExploreCard = (props) => {
  const { img, desc, id } = props;
  const his = useHistory();
  const onOpenLesson = (desc, e) => {
    e.preventDefault();
    his.push("/lesson-explorer/" + id + "/" + desc.split(" ").join("-"), {
      prop: props,
    });
  };
  return (
    <Box
      sx={{
        borderRadius: 12,
        background: "#fff",
        filter: "drop-shadow(0px 3px 20px rgba(0, 0, 0, 0.09))",
        width: "40%",
        padding: 8,
        margin: 3,
        maxWidth: "500px",
      }}
      onClick={(e) => {
        onOpenLesson(desc, e);
      }}
      className="go-to-lesson-box"
    >
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
  );
};

export default ExploreCard;
