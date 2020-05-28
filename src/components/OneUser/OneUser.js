import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
  },
  media: {
    height: 80,
    width: 80,
    borderRadius: "50%",
    marginRight: 24,
  },
  content: {
    flexGrow: 1,
  },
  typografy: {
    textDecoration: "none",
    color: "black",
  },
  button: {
    width: 92,
    height: 40,
    borderColor: "rgba(0, 0, 0, 1)",
    borderRadius: "34px",
  },
});

const OneUser = ({ user, history, location }) => {
  const classes = useStyles();
  const { name, avatar_url, company, created_at } = user;
  const [date, setDate] = useState(null);

  const goBack = () => {
    if (!location.state) {
      history.push("/userlist");
      return;
    }
    history.push(location.state.from);
  };

  useEffect(() => {
    const dateObj = new Date(created_at);
    const D = dateObj.getDate();
    const M = dateObj.getMonth() + 1;
    const Y = dateObj.getUTCFullYear();
    setDate(`${D}/${M}/${Y}`);
  }, [created_at]);

  return (
    <>
      <Button onClick={goBack}>To list</Button>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={avatar_url}
          alt="user avatar"
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h3">
            {name ? name : "Anonimus"}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {company ? company : "Unknown company"}
          </Typography>
          <Typography variant="caption" component="p">
            From {date}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default withRouter(OneUser);
