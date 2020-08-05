import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainPageCard from "../components/MainPageCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  return (
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
          <Grid item xs={4} sm={4} style = {{minWidth: "250px"}}>
            <MainPageCard
                      imageurl='vegetablebox.png'
                      title='Produkty'
                      description='Popis'
                      redirectPage={'/Products'}/>
          </Grid>
          <Grid item xs={4} sm={4} style = {{minWidth: "250px"}}>
            <MainPageCard
                      imageurl='vegetablebox.png'
                      title='Objednávky'
                      description='Popis'
                      redirectPage={'/order/list'}/>
          </Grid>
          <Grid item xs={4} sm={4} style = {{minWidth: "250px"}}>
            <MainPageCard
                      imageurl='vegetablebox.png'
                      title='Profil'
                      description='Popis'
                      redirectPage={'/profile'}/>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}