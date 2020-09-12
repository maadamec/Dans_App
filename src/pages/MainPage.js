import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Cookie from "js-cookie"
import SwipableManu from "../components/SwipableManu";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '200px'
  },

  paper_card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card_grid: {
    marginTop: theme.spacing(3),
  }
}));



export default function MainPage() {
  const classes = useStyles();

  const [user, setUser] = useState({admin: false, delivery_address: "", email: "", id: "", invoice_address: "", name: "", note: "", phone: "", registered_on: ""})

  async function fetchUser() {
    const res = await fetch("http://localhost:5000" + "/auth/status", {
     method: 'get',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token")
       })}
    );
    res
      .json()
      .then(res => {
        if(res.data === undefined){
          window.location.href = '/login'
        } else {
          setUser(res.data);
        }
      })
      .catch(err => console.log(err));

    console.log(user);
  }

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div>
      <SwipableManu admin={user.admin}/>
      {user.id === "" ?
        <div style={{ height: '90vh', margin: 0, padding: 0 }}>
          <Box display='flex' flex='1' justifyContent='center' alignItems="center" style={{ height: '90vh' }}>
              <CircularProgress size={50}/>
          </Box>
        </div>
      :
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Hlavní stránka
            </Typography>
            <Grid container spacing={3} justify="center" className={classes.card_grid}>
              <Grid item xs={4} sm={4} style = {{minWidth: "200px", minHeight: "200px"}}>
                <Card>
                  <CardActionArea>
                    <CardContent className={classes.paper_card}>
                      <Avatar className={classes.avatar}>
                        <ShoppingBasketIcon />
                      </Avatar>
                      <Typography gutterBottom variant="h5" component="h2">
                        Objednávky
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4} sm={4} style = {{minWidth: "250px"}}>
                <Card>
                  <CardActionArea>
                    <CardContent className={classes.paper_card}>
                      <Avatar className={classes.avatar}>
                        <ShoppingBasketIcon />
                      </Avatar>
                      <Typography gutterBottom variant="h5" component="h2">
                        Objednávky
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4} sm={4} style = {{minWidth: "250px"}}>
                <Card>
                  <CardActionArea>
                    <CardContent className={classes.paper_card}>
                      <Avatar className={classes.avatar}>
                        <ShoppingBasketIcon />
                      </Avatar>
                      <Typography gutterBottom variant="h5" component="h2">
                        Objednávky
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      }
    </div>
  );
}