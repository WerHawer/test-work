import React from "react";
import { Link, withRouter } from "react-router-dom";
import LinkMU from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 92,
    height: 40,
    border: "1px solid #000",
    borderRadius: "34px",
    textDecoration: "none",
    fontSize: "12px",
    lineHeight: "15px",
  },
});

const UserListEl = ({ user, location }) => {
  const classes = useStyles();
  const { login, avatar_url, id, name, html_url } = user;

  return (
    <li id={id}>
      <Card className={classes.root}>
        <Link
          to={{
            pathname: `/user/${login}`,
            state: { from: location },
          }}
          className={classes.typografy}
        >
          <CardMedia
            className={classes.media}
            image={avatar_url}
            alt="user avatar"
          />
        </Link>

        <CardContent className={classes.content}>
          <Typography className={classes.typografy} variant="h5">
            <Link
              to={{
                pathname: `/user/${login}`,
                state: { from: location },
              }}
              className={classes.typografy}
            >
              {name ? name : "Anonimus"}
            </Link>
          </Typography>
        </CardContent>

        <LinkMU
          href={html_url}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          className={classes.button}
        >
          Кнопка
        </LinkMU>
      </Card>
    </li>
  );
};

export default withRouter(UserListEl);
